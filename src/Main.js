import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";

export default function Main({ navigation }) {
  const keys = {
    social: "social",
    email: "email",
    sites: "sites",
    other: "other",
  };
  return (
    <View style={styles.container}>
      <StatusBar />
      <TouchableOpacity
        onPress={() => navigation.navigate("List", { key: keys.social })}
      >
        <Text style={styles.block}>Социальные сети</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("List", { key: keys.email })}
      >
        <Text style={styles.block}>Эл. почты</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("List", { key: keys.sites })}
      >
        <Text style={styles.block}>Сайты</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("List", { key: keys.other })}
      >
        <Text style={styles.block}>Другое</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9F5AED",
    justifyContent: "center",
  },
  block: {
    backgroundColor: "#DCCCED",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "black",
    fontSize: 20,
    padding: 10,
    margin: 5,
    textAlign: "center",
    fontWeight: "600",
  },
});
