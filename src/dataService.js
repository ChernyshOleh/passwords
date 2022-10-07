import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import * as Clipboard from "expo-clipboard";
import { Alert } from "react-native";

export const genPassword = () => nanoid(10);

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

export const remove = async (id, key) => {
  const value = JSON.parse(await AsyncStorage.getItem(key));
  const newList = JSON.stringify(value.filter((item) => item.id !== id));
  AsyncStorage.setItem(key, newList);
};

export const copy = async (value) => {
  if (value !== "") {
    await Clipboard.setStringAsync(value);
    Alert.alert("Скопировано в буфер обмена");
  }
};
