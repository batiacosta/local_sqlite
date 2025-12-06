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

export default function Modal() {
  const {id} = useLocalSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const database = useSQLiteContext();

  const [editmode, setEditmode] = useState(false);

  // Checking if we are in edit mode or not
  useEffect(() => {
    if (id) {
      setEditmode(true);
      loadData();
    }
  }, [id]);

  // Load data for editing
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

    // Save new entry
  const handleSave = async () => {
    try {
      await database.runAsync(
        "INSERT INTO users (name, email) VALUES (?, ?);",
        [name, email],
      );
    } catch (error) {
      console.error(error);
    }
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)");
    }
  };

  // Update existing entry
  const handleUpdate = async () => {
    try {
      await database.runAsync(
        "UPDATE users SET name = ?, email = ? WHERE id = ?;",
        [name, email, parseInt(id as string)],
      );
    } catch (error) {
      console.error(error);
    }
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Item Modal" }} />
      <View
        style={{
          gap: 20,
          marginVertical: 20,
          backgroundColor: "#EEE6D9",
          padding: 20,
          borderRadius: 10,
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
        <View
          style={{ flexDirection: "row", gap: 20, justifyContent: "center", backgroundColor: "#EEE6D9" }}
        >
          <TouchableOpacity
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace("/(tabs)");
              }
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => { editmode ? await handleUpdate() : await handleSave(); }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{editmode ? "Update" : "Save"}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1 }} />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#EEE6D9",
  },
  textInput: {
    borderWidth: 2,
    padding: 10,
    width: 300,
    borderRadius: 5,
    borderColor: "#841617",
    backgroundColor: "white",
    fontSize: 16,
  },
  button: {
    height: 40,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#841617",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#EEE6D9",
  },
});
