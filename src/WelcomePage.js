import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useContext } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AsyncContext } from "./context";
import { AppLoader } from "./AppLoader";

export default function WelcomePage({ navigation }) {
  const [password, setPassword] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const userContext = useContext(AsyncContext);

  useEffect(() => {
    (async function () {
      console.log(userContext.user);
      // AsyncStorage.clear();
      const userData = await AsyncStorage.getItem("user");
      if (!userData) {
        //userContext.userFromAsync();
        setTimeout(() => navigation.replace("RegistrationForm"), 5000);
        // console.log(userContext.user);
      } else {
        setTimeout(() => setIsReady(true), 5000);
      }
      const data = await AsyncStorage.getItem("password");
      if (data) {
        setUserPassword(data);
        setIsRegistered(true);
      }
    })();
  }, [userContext.user]);

  const createPassword = () => {
    AsyncStorage.setItem("password", password);
    setUserPassword(password);
    setPassword("");
  };

  const enterPassword = () => {
    if (password === userPassword) {
      navigation.replace("Main");
    } else {
      setShowAlert(true);
    }
  };
  if (isReady) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          {isRegistered ? "Введите пароль:" : "Придумайте пароль (до 10 цифр):"}
        </Text>
        {showAlert && <Text style={styles.alert}>*неверный пароль</Text>}
        <TextInput
          value={password}
          keyboardType="numeric"
          autoFocus={true}
          style={styles.input}
          maxLength={10}
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
        />
        {isRegistered ? (
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={() => enterPassword()}>
              <Text style={styles.btn}>Ок</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPassword("");
                setShowAlert(false);
                navigation.navigate("ChangePassword");
              }}
            >
              <Text style={styles.btn2}>Изменить пароль</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => createPassword()}>
            <Text style={styles.btn}>Ок</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  } else {
    return <AppLoader />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#9F5AED",
    padding: 50,
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
  btn2: {
    fontSize: 16,
    color: "white",
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },

  alert: {
    position: "absolute",
    color: "crimson",
    marginTop: 100,
  },
});
