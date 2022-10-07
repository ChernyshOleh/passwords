import { TextInput, StyleSheet } from "react-native";
import { CommonActions, useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

export default function Search() {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <TextInput
      placeholder="Поиск..."
      placeholderTextColor="white"
      style={styles.input}
      value={route.params.text}
      onChangeText={(text) =>
        navigation.dispatch(CommonActions.setParams({ text }))
      }
    />
  );
}

const styles = StyleSheet.create({
  input: {
    color: "white",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    width: 250,
    padding: 3,
    fontSize: 16,
  },
});
