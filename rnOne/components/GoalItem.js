import { StyleSheet, View, Text, Pressable } from "react-native";

//ios alternative to rippleand styling on pressable items
const GoalItem = (props) => {
  return (
    <Pressable
      onPress={props.onDeleteItem.bind(this, props.id)}
      style={ ({ pressed }) => pressed && styles.pressedItem }
    >
      <View style={styles.goalItem}>
        <Text style={styles.goalText}>{props.text}</Text>
      </View>
    </Pressable>
  );
};

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 12,
    backgroundColor: "plum",
    color: "white",
  },

  pressedItem: {
    opacity: 0.5,
  },

  goalText: {
    color: "white",
  },
});
