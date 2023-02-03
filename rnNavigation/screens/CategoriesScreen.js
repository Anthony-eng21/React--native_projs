import { FlatList } from "react-native";
import CategoryGridTile from "../components/CategoryGridTile";

import { CATEGORIES } from "../data/dummy-data";

// //helper function to our render item prop and we pass in another comp for a leaner approach
// const renderCategoryItem = (itemData) => {
//   //navigate to pressed content with this handler function
//   const pressHandler = () => {
//     // console.log('pressed');
//   };
//   return (
//     <CategoryGridTile
//       title={itemData.item.title}
//       color={itemData.item.color}
//       onPress={pressHandler}
//     />
//   );
// };

//we get the navigation prop because this is the comp that gets registered as a string

const CategoriesScreen = ({ navigation }) => {
  //helper function to our render item prop and we pass in another comp for a leaner approach
  const renderCategoryItem = (itemData) => {
    //navigate to pressed content with this handler function
    const pressHandler = () => {
      //this navigate method wants the page/screen we want to nav to
      navigation.navigate("MealsOverview", {
        categoryId: itemData.item.id,
      });
      // console.log(itemData.item.id)
    };
    
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    );
  };
  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
};

export default CategoriesScreen;
