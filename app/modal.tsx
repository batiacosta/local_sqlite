import { StatusBar } from "expo-status-bar";
import { router, Stack } from "expo-router";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import {
  SafeAreaFrameContext,
  SafeAreaView,
} from "react-native-safe-area-context";

export default function Modal() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Item Modal" }} />
      <Text style={styles.title}>Modal</Text>
      <View
        style={{ flex: 1, flexDirection: "row", gap: 20 }}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()}>
          <Text>Save</Text>
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
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
