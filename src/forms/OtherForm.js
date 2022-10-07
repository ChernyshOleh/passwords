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
import { AntDesign } from "@expo/vector-icons";
import { copy } from "../dataService";

export default function OtherForm({ navigation, route }) {
  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{
          key: "other",
          id: route.params?.item.id || Date.now().toString(),
          header: route.params?.item.header || "",
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
