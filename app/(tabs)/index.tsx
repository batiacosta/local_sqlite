import { StyleSheet, TouchableOpacity } from "react-native";
import { router, Stack } from "expo-router";
import { Text, View } from "@/components/Themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TabOneScreen() {
  const headerRight = () => {
    return (
      <TouchableOpacity
        onPress={() => router.push("/modal")}
        style={{ marginRight: 10 }}
      >
        <FontAwesome name="edit" size={24} color="black" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerRight }} />
      <Text style={styles.title}>Tab [Home]</Text>
    </View>
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
