import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import MealsList from "../components/MealsList/MealsList";
import { MEALS } from "../data/dummy-data";
import { FavoritesContext } from "../store/context/favorites-context";

const FavoritesScreen = () => {
  const favoriteMealsCtx = useContext(FavoritesContext);

  //MEALS.filter returns an array with all the meals that have an entry in this ids array in our ctx state data
  const favoriteMeals = MEALS.filter((meal) =>
    favoriteMealsCtx.ids.includes(meal.id)
  );

  //no fav meals check
  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorite meals yet!</Text>
      </View>
    );
  }

  return (
    //this meal list returns a reusable meallist comp with the filtered favorite meals in this flat list comp
    <MealsList items={favoriteMeals} />
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 75,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'darkgoldenrod'
    },
});
