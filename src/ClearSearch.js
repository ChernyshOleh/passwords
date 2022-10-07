import { CommonActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function ClearSearch() {
  const navigation = useNavigation();
  return (
    <AntDesign
      name="close"
      size={24}
      color="white"
      onPress={() => {
        navigation.dispatch(CommonActions.setParams({ text: "" }));
      }}
    />
  );
}
