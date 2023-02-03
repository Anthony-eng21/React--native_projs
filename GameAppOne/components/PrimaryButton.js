import { View, Text, Pressable, StyleSheet } from "react-native";
//same thing as props.children but with object destructuring
//pass this comp to StartGameScreen
//onPress we destructure that and add it to the onPress as a passable onPress value for other comp to consume
const PrimaryButton = ({ children, onPress }) => {
  //on pressable if pressed obj is truthy set those objects otherwise set default innerContainer styles
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: "gold" }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: "rebeccapurple",
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.5,
  },
  //no cascading in this styling approach so we have to add these styles in a separate object
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  //for setting ripple on ios we set this pressed prop with some opacity
  pressed: {
    opacity: 0.75,
  },
});
