import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Formik } from "formik";
import { styles } from "./formStyles";
import { generatePassword } from "../dataService";
import { AntDesign } from "@expo/vector-icons";
import { copy } from "../dataService";

export default function SocialForm({ navigation, route }) {
  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{
          key: "social",
          id: route.params?.item.id || Date.now().toString(),
          header: route.params?.item.header || "",
          login: route.params?.item.login || "",
          email: route.params?.item.email || "",
          number: route.params?.item.number || "",
          password: route.params?.item.password || "",
          notes: route.params?.item.notes || "",
        }}
        onSubmit={(values, action) => {
          if (values.header !== "") {
            navigation.navigate("List", { values });
            action.resetForm();
          } else {
            Alert.alert("", "Должно быть название");
          }
        }}
      >
        {(props) => (
          <View>
            <Text style={styles.titles}>Название:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={props.values.header}
                maxLength={30}
                onChangeText={props.handleChange("header")}
              />
              <AntDesign
                style={styles.icons}
                name="copy1"
                size={24}
                color="black"
                onPress={() => copy(props.values.header)}
              />
            </View>

            <Text style={styles.titles}>Логин:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={props.values.login}
                maxLength={40}
                onChangeText={props.handleChange("login")}
              />
              <AntDesign
                style={styles.icons}
                name="copy1"
                size={24}
                color="black"
                onPress={() => copy(props.values.login)}
              />
            </View>

            <Text style={styles.titles}>Email:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={props.values.email}
                maxLength={40}
                onChangeText={props.handleChange("email")}
              />
              <AntDesign
                style={styles.icons}
                name="copy1"
                size={24}
                color="black"
                onPress={() => copy(props.values.email)}
              />
            </View>

            <Text style={styles.titles}>Номер телефона:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={props.values.number}
                maxLength={40}
                onChangeText={props.handleChange("number")}
              />
              <AntDesign
                style={styles.icons}
                name="copy1"
                size={24}
                color="black"
                onPress={() => copy(props.values.number)}
              />
            </View>

            <Text style={styles.titles}>Пароль:</Text>
            <AntDesign
              style={{}}
              onPress={() =>
                props.setFieldValue("password", generatePassword(10))
              }
              name="reload1"
              size={24}
              color="black"
            />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={props.values.password}
                maxLength={30}
                onChangeText={props.handleChange("password")}
              />
              <AntDesign
                style={styles.icons}
                name="copy1"
                size={24}
                color="black"
                onPress={() => copy(props.values.password)}
              />
            </View>

            <Text style={styles.titles}>Заметки:</Text>
            <TextInput
              style={styles.input}
              value={props.values.notes}
              multiline
              maxLength={300}
              onChangeText={props.handleChange("notes")}
            />
            <TouchableOpacity onPress={props.handleSubmit}>
              <Text style={styles.btn}>Готово</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}
