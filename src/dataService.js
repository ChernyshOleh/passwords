import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import * as Clipboard from "expo-clipboard";
import { Alert } from "react-native";

// Генерация пароля
export const generatePassword = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  return password;
};

// Получить id пользователя
export const getUserId = async () => {
  const user = JSON.parse(await AsyncStorage.getItem("user"));
  return user.uid;
};

// Получить данные из AsyncStorage по ключу
export const getData = async (key) => {
  const data = await AsyncStorage.getItem(key);
  return data;
};

export const add = (content, key, list) => {
  const editIndex = list.findIndex((item) => item.id === content.id);
  if (editIndex !== -1) {
    const newList = JSON.parse(JSON.stringify(list));
    newList[editIndex] = content;
    AsyncStorage.setItem(key, JSON.stringify(newList));
  } else {
    const newList = JSON.stringify([content, ...list]);
    AsyncStorage.setItem(key, newList);
  }
};

// export async function getAllData() {
//   const data = await AsyncStorage.multiGet([
//     "social",
//     "email",
//     "sites",
//     "other",
//   ]);
//   const list = [
//     { social: data[0][1] },
//     { email: data[1][1] },
//     { sites: data[2][1] },
//     { other: data[3][1] },
//   ];
//   return list;
// }

// export const multiAdd = (list) => {
//   AsyncStorage.multiSet([
//     ["social", list.social],
//     ["email", list.email],
//     ["sites", list.sites],
//     ["other", list.other],
//   ]);
// };

// Удалить запись (локально)
export const remove = async (id, key) => {
  const value = JSON.parse(await AsyncStorage.getItem(key));
  const newList = JSON.stringify(value.filter((item) => item.id !== id));
  AsyncStorage.setItem(key, newList);
};

// Функция копирования
export const copy = async (value) => {
  if (value !== "") {
    await Clipboard.setStringAsync(value);
    Alert.alert("Скопировано в буфер обмена");
  }
};

// Функция-обработчик ошибок
export const handleErrors = (error) => {
  const message = error.message.slice(22);
  switch (message) {
    case "email-already-in-use).":
      return "Такой email уже используется.";
    case "user-not-found).":
      return "Такой пользователь не найден.";
    case "invalid-email).":
      return "Введите корректный email.";
    case "uld be at least 6 characters (auth/weak-password).":
      return "Пароль должен состоять минимум из 6 символов.";
    default:
      return "Произошла ошибка. Попробуйте ещё раз.";
  }
};
