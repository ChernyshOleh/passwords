import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./formStyles";
import { handleErrors } from "../dataService";

export default function LoginForm({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const handleLogin = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      await AsyncStorage.setItem("user", JSON.stringify(response.user));
      navigation.navigate("WelcomePage");
      // Дополнительные действия после успешной авторизации...
      console.log("Login successful:", response.user);
    } catch (error) {
      const message = handleErrors(error);
      Alert.alert("Проверте правильность введённых данных", message, [
        { text: "OK", style: "OK" },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titles}>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Text style={styles.titles}>Пароль:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.btn}>Войти</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.replace("RegistrationForm")}>
        <Text style={styles.btn}>Регистрация</Text>
      </TouchableOpacity>
    </View>
  );
}
