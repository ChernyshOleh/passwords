import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { getData, add, remove } from "./dataService";
import { getDocuments } from "./firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function List({ navigation, route }) {
  const [list, setList] = useState([]);
  const [KEY, setKEY] = useState(route.params.key);
  const [text, setText] = useState("");

  useEffect(() => {
    if (route.params.text || route.params.text === "") {
      setText(route.params.text);
    } else {
      setText("");
    }
    if (route.params.values) {
      setKEY(route.params.values.key);
      add(route.params.values, KEY, list);
      fetchData(KEY);
    }
    fetchData(KEY);
  }, [route.params.values, route.params.text]);

  async function fetchData(key) {
    const data = await getData(key);
    if (data !== null) {
      setList(JSON.parse(data));
    } else {
      try {
        const data = await getDocuments(KEY, route.params.uid);
        await AsyncStorage.setItem(KEY, JSON.stringify(data));
        setList(data);
      } catch (error) {
        console.log("Не удалось получить данные из firebase: ", error);
      }
    }
  }

  async function getDataFromFirebase() {
    try {
      const data = await getDocuments(KEY, route.params.uid);
      await AsyncStorage.setItem(KEY, JSON.stringify(data));
      setList(data);
    } catch (error) {
      console.log("Не удалось получить данные из firebase: ", error);
    }
  }

  async function deleteItem(id) {
    Alert.alert("Подтверждение", "Действительно удалить запись?", [
      {
        text: "Нет",
      },
      {
        text: "Да",
        onPress: async () => {
          await remove(id, KEY);
          fetchData(KEY);
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {list
          .filter((item) =>
            item.header.toLowerCase().includes(text.toLowerCase().trim())
          )
          .map((item, id) => (
            <View key={id} style={styles.block}>
              <TouchableOpacity
                style={styles.data}
                onPress={() => {
                  switch (KEY) {
                    case "social":
                      navigation.navigate("SocialForm", { item });
                      break;
                    case "email":
                      navigation.navigate("EmailForm", { item });
                      break;
                    case "sites":
                      navigation.navigate("SiteForm", { item });
                      break;
                    case "other":
                      navigation.navigate("OtherForm", { item });
                      break;
                  }
                }}
              >
                <Text style={styles.header}>{item.header}</Text>
                {KEY === "social" && (
                  <View>
                    <Text style={{ fontWeight: "500" }}>
                      Логин: {item.login}
                    </Text>
                    <Text style={{ fontWeight: "500" }}>
                      Пароль: {item.password}
                    </Text>
                  </View>
                )}
                {KEY === "email" && (
                  <View>
                    <Text style={{ fontWeight: "500" }}>
                      Email: {item.email}
                    </Text>
                    <Text style={{ fontWeight: "500" }}>
                      Пароль: {item.password}
                    </Text>
                  </View>
                )}
                {KEY === "sites" && (
                  <View>
                    <Text style={{ fontWeight: "500" }}>
                      Логин: {item.login}
                    </Text>
                    <Text style={{ fontWeight: "500" }}>
                      Email: {item.email}
                    </Text>
                    <Text style={{ fontWeight: "500" }}>
                      Пароль: {item.password}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

              <AntDesign
                name="delete"
                size={24}
                color="black"
                onPress={() => deleteItem(item.id)}
              />
            </View>
          ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          switch (KEY) {
            case "social":
              navigation.navigate("SocialForm");
              break;
            case "email":
              navigation.navigate("EmailForm");
              break;
            case "sites":
              navigation.navigate("SiteForm");
              break;
            case "other":
              navigation.navigate("OtherForm");
              break;
          }
        }}
      >
        <AntDesign
          style={styles.plus}
          name="pluscircleo"
          size={40}
          color="black"
        />
      </TouchableOpacity>
      <Button title="запросить данные" onPress={getDataFromFirebase} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9F5AED",
    justifyContent: "flex-end",
  },
  plus: {
    borderTopWidth: 2,
    borderColor: "black",
    textAlign: "center",
    padding: 10,
    backgroundColor: "#7543AF",
  },
  block: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "black",
    margin: 2,
    padding: 10,
    backgroundColor: "#DCCCED",
  },
  data: {
    width: "93%",
    flexDirection: "column",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
