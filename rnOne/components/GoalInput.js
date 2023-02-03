import { useState } from "react";
import {
  Button,
  TextInput,
  View,
  StyleSheet,
  Modal,
  Image,
} from "react-native";

const GoalInput = (props) => {
  const [enteredGoalText, setEnteredGoalText] = useState("");

  //listens to every keystroke with state on this TextInput element 
  const goalInputHandler = (enteredText) => {
    setEnteredGoalText(enteredText);
  };
  //manuallly pass entered goal text via props when we press this button that points to this function which will invoke the parent ele;s
  //onAddGoal prop and add this input data from out TextInput
  const addGoalHandler = () => {
    props.onAddGoal(enteredGoalText);
    //set's this TextInput's state back to an empty string when this state task starts/submits this and value prop do this
    setEnteredGoalText("");
  };
  
  //we need to pass enteredGoalText to the value prop to update the state's value on this TextInput and not jus in memory
  //Image native comopnent has a source prop but we have to pass a require function as it's value with the image path we want
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require("../assets/Images/goal.png")}
          // source="/some/path/to/image.png"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Add a Goal"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button onPress={props.onCancel} title="Cancel" color="#f31282" />
          </View>
          <View style={styles.button}>
            <Button onPress={addGoalHandler} title="Add Goal" color="plum" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 24,
    padding: 18,
    paddingBottom: 160,
    backgroundColor: "#311b6b",
  },

  image: {
    width: 100,
    height: 100,
    margin: 20,
  },

  textInput: {
    borderWidth: 2,
    borderColor: "#e4d0ff",
    backgroundColor: '#e4d0ff', 
    color: '#120438',
    borderRadius: 6,
    width: "100%",
    padding: 12,
  },

  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },

  button: {
    width: 125,
    marginHorizontal: 8,
  },
});
