import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
//native-stack nav over everything
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import CategoriesScreen from "./screens/CategoriesScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import FavoritesContextProvider from "./store/context/favorites-context";
//creating a stack of screens with this import
//Stack const is an obj that now holds two object properties that act as comps
//i.e Stack.Screen and Stack.Navigator
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

//the navigation-stack pack screen adds a nice background for us and a nice
//header for us passed as a string we set to name
//and a nice default layout with a notch and a nice container
//options prop lives in the screen api and allows us to configure our headers and back button styles etc...

const DrawerNavigatior = () => {
  return (
    <Drawer.Navigator //screenOptions allows us to set default screen styles to all screens
      screenOptions={{
        headerStyle: { backgroundColor: "black" },
        //this is the color of the header text/string
        headerTintColor: "white",
        //whole screen's content color
        sceneContainerStyle: { backgroundColor: "black" },
        drawerContentStyle: { backgroundColor: "black" },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "rebeccapurple",
        drawerActiveBackgroundColor: "#e4baa1",
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "All Categories",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: "Favorites",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <FavoritesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            //screenOptions allows us to set default screen styles to all screens
            screenOptions={{
              headerStyle: { backgroundColor: "black" },
              //this is the color of the header text/string
              headerTintColor: "white",
              //whole screen's content color
              contentStyle: { backgroundColor: "black" },
            }}
          >
            <Stack.Screen
              name="Drawer"
              component={DrawerNavigatior}
              options={{
                // title: "All Categories", we just want to show the drawer header
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MealsOverview"
              component={MealsOverviewScreen}
            />
            <Stack.Screen
              name="MealDetail"
              component={MealDetailScreen}
              options={{
                title: "About The Meal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
