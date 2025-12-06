import { Text, View } from "@/components/Themed";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  SafeAreaView
} from "react-native-safe-area-context";

type UserType = {
  id: number;
  name: string;
  email: string;
};

export default function Modal() {
  const {id} = useLocalSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const database = useSQLiteContext();

  const [editmode, setEditmode] = useState(false);

  useEffect(() => {
    if (id) {
      setEditmode(true);
      // Load the user data for the given id
      
      loadData();
    }
  }, [id]);

  const loadData = async () => {
        try {
          const result = await database.getFirstAsync<{name: string; email: string}>(
            "SELECT name, email FROM users WHERE id = ?;",
            [parseInt(id as string)],
          );
          if (result) {
            setName(result.name);
            setEmail(result.email);
          }
        } catch (error) {
          console.error(error);
        }
    };

  const handleSave = async () => {
    try {
      await database.runAsync(
        "INSERT INTO users (name, email) VALUES (?, ?);",
        [name, email],
      );
    } catch (error) {
      console.error(error);
    }
    router.back();
  };

  const handleUpdate = async () => {
    try {
      await database.runAsync(
        "UPDATE users SET name = ?, email = ? WHERE id = ?;",
        [name, email, parseInt(id as string)],
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Item Modal" }} />
      <View
        style={{
          gap: 20,
          marginVertical: 20,
        }}
      >
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.textInput}
        />
      </View>

      <View
        style={{ flex: 1, flexDirection: "row", gap: 20 }}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.button, { backgroundColor: "red" }]}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => { editmode ? await handleUpdate() : await handleSave(); router.back(); }}
          style={[styles.button, { backgroundColor: "blue" }]}
        >
          <Text style={styles.buttonText}>{editmode ? "Update" : "Save"}</Text>
        </TouchableOpacity>
      </View>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    width: 300,
    borderRadius: 5,
    borderColor: "slategray",
  },
  button: {
    height: 40,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
  },
});
