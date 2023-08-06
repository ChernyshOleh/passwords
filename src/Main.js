import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getUserId } from "./dataService";
import { addDocuments, removeMissingDocuments, getDocuments } from "./firebase";
import { signOut, getAuth } from "firebase/auth";
import { THEM_COLORS } from "./them";

export default function Main({ navigation }) {
  const [userId, setUserId] = useState("");
  const auth = getAuth();
  const keys = {
    social: "social",
    email: "email",
    sites: "sites",
    other: "other",
  };
  useEffect(() => {
    (async function a() {
      const id = await getUserId();
      setUserId(id);
    })();
    // async function get() {
    //   const data = await getAllData();
    //   console.log(data);
    // }
    // get();
    // multiAdd([
    //   ["social", { header: "www" }],
    //   ["email", {}],
    // ]);
    // async function aaa() {
    //   const data = await fetchData2();
    //   console.log(data);
    // }
    // aaa();
  }, []);

  async function save() {
    const socialData = await AsyncStorage.getItem("social");
    await addDocuments(JSON.parse(socialData), "social", userId);
    await removeMissingDocuments(JSON.parse(socialData), "social", userId);
    const emailData = await AsyncStorage.getItem("email");
    await addDocuments(JSON.parse(emailData), "email", userId);
    await removeMissingDocuments(JSON.parse(emailData), "email", userId);
    const sitesData = await AsyncStorage.getItem("sites");
    await addDocuments(JSON.parse(sitesData), "sites", userId);
    await removeMissingDocuments(JSON.parse(sitesData), "sites", userId);
    const otherData = await AsyncStorage.getItem("other");
    await addDocuments(JSON.parse(otherData), "other", userId);
    await removeMissingDocuments(JSON.parse(otherData), "other", userId);
  }

  async function loadAllData() {
    try {
      const socialData = await getDocuments(keys.social, userId);
      await AsyncStorage.setItem(keys.social, JSON.stringify(socialData));
      const emailData = await getDocuments(keys.email, userId);
      await AsyncStorage.setItem(keys.email, JSON.stringify(emailData));
      const sitesData = await getDocuments(keys.sites, userId);
      await AsyncStorage.setItem(keys.sites, JSON.stringify(sitesData));
      const otherData = await getDocuments(keys.other, userId);
      await AsyncStorage.setItem(keys.other, JSON.stringify(otherData));
      Alert.alert("", "Данные успешно загружены");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("List", { key: keys.social, uid: userId })
        }
      >
        <Text style={styles.block}>Социальные сети</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("List", { key: keys.email, uid: userId })
        }
      >
        <Text style={styles.block}>Эл. почты</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("List", { key: keys.sites, uid: userId })
        }
      >
        <Text style={styles.block}>Сайты</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("List", { key: keys.other, uid: userId })
        }
      >
        <Text style={styles.block}>Другое</Text>
      </TouchableOpacity>
      <View style={styles.bottomBlock}>
        <TouchableOpacity onPress={save}>
          <Text style={styles.bottomBtns}>Сохранить</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={loadAllData}>
          <Text style={styles.bottomBtns}>Загрузить</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            try {
              await signOut(auth);
              AsyncStorage.removeItem("user");
              navigation.replace("LoginForm");
            } catch (e) {
              console.log(e);
            }
          }}
        >
          <Text style={styles.bottomBtns}>Выйти с аккаунта</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEM_COLORS.main_color,
    justifyContent: "center",
  },
  block: {
    color: THEM_COLORS.text_color_1,
    backgroundColor: THEM_COLORS.color_of_list,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "black",
    fontSize: 20,
    padding: 10,
    margin: 5,
    textAlign: "center",
    fontWeight: "600",
  },
  bottomBtns: {
    backgroundColor: THEM_COLORS.color_btn,
    color: THEM_COLORS.text_color_2,
    fontSize: 20,
    padding: 10,
    margin: 5,
    textAlign: "center",
    fontWeight: "600",
  },
  bottomBlock: {
    marginTop: 100,
  },
});
