import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const bottomTabNavContainer = () => {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="!Todo" component />
      <BottomTabs.Screen name="!Todo2" component />
      <BottomTabs.Screen name="!Todo3" component />
    </BottomTabs.Navigator>
  )
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={bottomTabNavContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
});
