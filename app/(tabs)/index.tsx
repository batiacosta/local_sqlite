import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { router, Stack } from "expo-router";
import { Text, View } from "@/components/Themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useComposedEventHandler } from "react-native-reanimated";

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
        <FontAwesome name="plus-circle" size={24} color="blue" />
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
          renderItem={({ item }) => {
            return (
              <View>
                <Text> {item.name}</Text>
                <Text> {item.email}</Text>
                <Text> {item.id}</Text>
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
