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
        <FontAwesome name="plus-circle" size={28} color="#841617" />
      </TouchableOpacity>
    );
  };

  const handleDelete = async (id: number) => {
    try {
      await database.runAsync("DELETE FROM users WHERE id = ?;", [id]);
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  return (
    <View style={[styles.container, { backgroundColor: "#EEE6D9" }]}>
      <Stack.Screen options={{ headerRight }} />
      <View style={{backgroundColor: "#EEE6D9", width: "100%", flex: 1, padding: 10 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <View style={{ padding: 10 , backgroundColor: "#EEE6D9"}}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    backgroundColor: "#EEE6D9",
                  }}
                >
                  <View style={{ backgroundColor: "#EEE6D9" }}> 
                    <Text>{item.name}</Text>
                    <Text>{item.email}</Text>
                  </View>
                  <View style={{ flexDirection: "row", gap: 10, backgroundColor: "#EEE6D9" }}>
                    <TouchableOpacity
                      onPress={() => {
                        router.push(`/modal?id=${item.id}`);
                      }}
                      style={styles.editButton}
                    >
                      <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handleDelete(item.id);
                      }}
                      style={styles.deleteButton}
                    >
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
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
    backgroundColor: "#EEE6D9",
  },
  button: {
    backgroundColor: "#841617",
    padding: 5,
    borderRadius: 5,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  editButton: {
    backgroundColor: "#841617",
    padding: 5,
    borderRadius: 5,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    backgroundColor: "#EEE6D9",
    padding: 5,
    borderRadius: 5,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#841617",
  },
  buttonText: {
    color: "#EEE6D9",
    fontWeight: "bold",
    fontSize: 12,
  },
  deleteButtonText: {
    color: "#841617",
    fontWeight: "bold",
    fontSize: 12,
  },
});
