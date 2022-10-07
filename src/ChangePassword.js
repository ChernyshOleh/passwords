import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChangePassword({ navigation }) {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [passIsTrue, setPassIsTrue] = useState(false);
  const [userPassword, setUserPassword] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("password").then((value) => setUserPassword(value));
  });

  const enterPassword = () => {
    if (password === userPassword) {
      setPassword("");
      setPassIsTrue(true);
    } else {
      setShowAlert(true);
    }
  };
  const setNewPassword = () => {
    if (password === password2) {
      AsyncStorage.setItem("password", password);
      Alert.alert("Пароль изменён");
      navigation.goBack();
    } else {
      Alert.alert("Пароли не совпадают");
    }
  };
  if (passIsTrue) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Введите новый пароль:</Text>
        <TextInput
          keyboardType="numeric"
          autoFocus={true}
          style={styles.input}
          maxLength={10}
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
        />
        <Text style={styles.header}>Повторите новый пароль:</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          maxLength={10}
          secureTextEntry={true}
          onChangeText={(value) => setPassword2(value)}
        />
        <TouchableOpacity onPress={() => setNewPassword()}>
          <Text style={styles.btn}>Ок</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Введите старый пароль:</Text>
        {showAlert && <Text style={styles.alert}>*неверный пароль</Text>}
        <TextInput
          keyboardType="numeric"
          autoFocus={true}
          style={styles.input}
          maxLength={10}
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
        />
        <TouchableOpacity onPress={() => enterPassword()}>
          <Text style={styles.btn}>Ок</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#9F5AED",
    paddingVertical: 50,
  },
  header: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
  },
  input: {
    fontSize: 20,
    color: "white",
    padding: 3,
    borderBottomWidth: 2,
    borderColor: "black",
    width: "50%",
    marginVertical: 50,
    textAlign: "center",
  },
  btn: {
    fontSize: 26,
    backgroundColor: "crimson",
    color: "white",
    padding: 5,
    width: 100,
    textAlign: "center",
  },
  alert: {
    position: "absolute",
    color: "crimson",
    marginTop: 100,
  },
});
