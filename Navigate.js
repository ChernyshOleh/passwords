import Main from "./src/Main";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SocialForm from "./src/forms/SocialForm";
import EmailForm from "./src/forms/EmailForm";
import SiteForm from "./src/forms/SiteForm";
import List from "./src/List";
import Search from "./src/Search";
import OtherForm from "./src/forms/OtherForm";
import WelcomePage from "./src/WelcomePage";
import ClearSearch from "./src/ClearSearch";
import ChangePassword from "./src/ChangePassword";

const Stack = createNativeStackNavigator();

export default function Navigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="WelcomePage"
          component={WelcomePage}
          options={{
            title: "ПАРОЛИ",
            headerStyle: { backgroundColor: "black" },
            headerTitleStyle: { color: "white" },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            title: "ПАРОЛИ",
            headerStyle: { backgroundColor: "black" },
            headerTitleStyle: { color: "white" },
            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: "ПАРОЛИ",
            headerStyle: { backgroundColor: "black" },
            headerTitleStyle: { color: "white" },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="SocialForm"
          component={SocialForm}
          options={{
            title: "Соц. сеть",
            headerStyle: { backgroundColor: "black" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="EmailForm"
          component={EmailForm}
          options={{
            title: "Email",
            headerStyle: { backgroundColor: "black" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="SiteForm"
          component={SiteForm}
          options={{
            title: "Сайт",
            headerStyle: { backgroundColor: "black" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="OtherForm"
          component={OtherForm}
          options={{
            title: "Другое",
            headerStyle: { backgroundColor: "black" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="List"
          component={List}
          options={{
            headerTitle: () => <Search />,
            headerRight: () => <ClearSearch />,
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "white",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
