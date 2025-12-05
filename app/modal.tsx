import { StatusBar } from "expo-status-bar";
import { router, Stack } from "expo-router";
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "@/components/Themed";
import {
  SafeAreaFrameContext,
  SafeAreaView,
} from "react-native-safe-area-context";
import { useState } from "react";
import { useSQLiteContext } from "expo-sqlite";

export default function Modal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const database = useSQLiteContext();

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
          onPress={() => router.back()}
          style={[styles.button, { backgroundColor: "blue" }]}
        >
          <Text style={styles.buttonText}>Save</Text>
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
