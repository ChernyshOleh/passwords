import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { styles } from "./formStyles";

export default function RegistrationForm({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const handleRegistration = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigation.navigate("LoginForm");
      // Дополнительные действия после успешной регистрации...
      console.log("Registration successful:", response.user);
    } catch (error) {
      console.error("Registration error:", error);
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
      <TouchableOpacity onPress={handleRegistration}>
        <Text style={styles.btn}>Ок</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.replace("LoginForm")}>
        <Text style={styles.btn}>Вход</Text>
      </TouchableOpacity>
    </View>
  );
}
