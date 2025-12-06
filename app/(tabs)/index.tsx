import { Text, View } from "@/components/Themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";
import { router, Stack } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

type UserType = {
  id: number;
  name: string;
  email: string;
};

export default function TabOneScreen() {
  const [data, setData] = useState<UserType[]>([]);
  const database = useSQLiteContext();

  const loadData = async () => {
    console.log("Loading data...");
    const result = await database.getAllAsync<UserType>("SELECT * FROM users");
    setData(result);
  };

  const headerRight = () => {
    return (
      <TouchableOpacity
        onPress={() => router.push("/modal")}
        style={{ marginRight: 10 }}
      >
        <FontAwesome name="plus-circle" size={28} color="blue" />
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerRight }} />
      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <View style={{ padding: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <View>
                    <Text>{item.name}</Text>
                    <Text>{item.email}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      router.push(`/modal?id=${item.id}`);
                    }}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: 5,
    borderRadius: 5,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});
