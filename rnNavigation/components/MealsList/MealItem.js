import { View, Text, StyleSheet, Pressable, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";
import MealDetails from "../MealDetails";

const MealItem = ({
  //props
  id,
  title,
  imageUrl,
  duration,
  complexity,
  affordability,
}) => {
  //this component isn't rendered as a screen in our navigation api so it doesn't have direct access to navigation or route props
  const navigation = useNavigation();

  //helper handler if not a () this causes a nasty side effect
  const selectMealItemhandler = () => {
    navigation.navigate("MealDetail", {
      mealId: id,
    });
  };

  return (
    <View style={styles.mealItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
        onPress={selectMealItemhandler}
      >
        <View style={styles.innerContainer}>
          <View>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
          </View>
          <MealDetails duration={duration} affordability={affordability} complexity={complexity} />
        </View>
      </Pressable>
    </View>
  );
};

export default MealItem;

const styles = StyleSheet.create({
  mealItem: {
    margin: 16,
    borderRadius: 8,
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 16,
    //conditional platform styling
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  //w/o this extra view none of the shadow and border radius styling wouldn't work with the overflow on the mealitem comp
  innerContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    textShadowColor: "black",
    margin: 8,
  },

  //styling on pressed state for items/buttons on ios
  buttonPressed: {
    opacity: 0.5,
  },
});
