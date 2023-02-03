import { useLayoutEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";

import MealItem from "../components/MealsList/MealItem";
import MealsList from "../components/MealsList/MealsList";
import { MEALS, CATEGORIES } from "../data/dummy-data";

//route like navigation we get it because this comp is registered as a screen in our App.js
const MealsOverviewScreen = ({ route, navigation }) => {
  //gets category id and route thats passed through navigation to this new screen
  const catId = route.params.categoryId;

  //this helper constant helps us find a match of our id's in our array
  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  //useLayoutEffect: runs this effect simultaneuously while this component/screen renders
  useLayoutEffect(() => {
    //finds the title of a Category through prop id and title
    const CategoryTitle = CATEGORIES.find(
      (category) => category.id === catId
    ).title;

    //sets the category title with this navigation prop we get
    navigation.setOptions({
      title: CategoryTitle,
    });
  }, [catId, navigation]);

  return <MealsList items={displayedMeals} />
};

export default MealsOverviewScreen;


