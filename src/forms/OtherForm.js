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
import { useState } from "react";

export default function OtherForm({ navigation, route }) {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{
          key: "other",
          id: route.params?.item.id || Date.now().toString(),
          header: route.params?.item.header || "",
          // notes: route.params?.item.notes || "",
          fields: route.params?.item.fields || [],
          descriptions: route.params?.item.descriptions || [],
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
          <View style={{ marginBottom: 30 }}>
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
            <View>
              <Text style={styles.titles}>Поле:</Text>
              <TextInput
                style={styles.input}
                value={text1}
                maxLength={30}
                onChangeText={setText1}
              />
              <Text style={styles.titles}>Описание:</Text>
              <TextInput
                style={styles.input}
                value={text2}
                maxLength={100}
                onChangeText={setText2}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                if (text1.trim() && text2.trim()) {
                  const newFields = [...props.values.fields];
                  props.setFieldValue("fields", [...newFields, text1]);
                  const newDescriptions = [...props.values.descriptions];
                  props.setFieldValue("descriptions", [
                    ...newDescriptions,
                    text2,
                  ]);
                  setText1("");
                  setText2("");
                }
              }}
            >
              <Text style={styles.btn}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.handleSubmit}>
              <Text style={styles.btn}>Готово</Text>
            </TouchableOpacity>
            {props.values.fields.map((field, index) => (
              <View key={index}>
                <Text style={styles.titles}>{field}:</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={props.values.descriptions[index]}
                    multiline
                    maxLength={300}
                    onChangeText={(text) => {
                      const newDescriptions = [...props.values.descriptions];
                      newDescriptions[index] = text;
                      props.setFieldValue("descriptions", newDescriptions);
                    }}
                  />
                  <AntDesign
                    style={styles.icons}
                    name="copy1"
                    size={24}
                    color="black"
                    onPress={() => copy(props.values.descriptions[index])}
                  />
                </View>
              </View>
            ))}
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}
