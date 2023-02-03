import { useState } from "react";

import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  useWindowDimensions,
  //wraps other content and makes your elements available and not covered by the board
  //nice sideeffect is that this allows us to exit the keyboard on a tap outside of the keyboard 
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import PrimaryButton from "../components/PrimaryButton";
import Title from "../components/Title";
import Card from "../components/Card";
import InstructionText from "../components/InstructionText";

//add multiple views with flexbox properties to achieve the layout we want
const StartGameScreen = ({ onPickNumber }) => {
  const [enteredNumber, setEnteredNumber] = useState("");

  //this hook is used to make dynamic dimensions
  const { width, height } = useWindowDimensions();

  //we immediately invoke the keystroke value because react native is nice like that(no need for useRef)
  const numberInputHandler = (enteredText) => {
    setEnteredNumber(enteredText);
  };

  //add this function to the onPress prop on alert() to reset the input to ('') when certain confirmation conditions are met
  const resetInputHandler = () => {
    setEnteredNumber("");
  };

  const confirmInputHandler = () => {
    //parseInt tries to convert/read this string as a number
    const chosenNumber = parseInt(enteredNumber);

    //isNan() checks if the conversion failed
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      //show alert ... thankfully ReactN exposes an alert api{} which holds a method we can apply to show an alert
      //which holds a button title a message and an array of buttons we want to expose
      Alert.alert(
        "Invalid Number!",
        "Number has to be a number between 1 and 99.",
        [{ text: "Retry", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    //if these conditions aren't met programmitcally render the GameScreen comp on a correct input in app js via this
    // onPickNumber prop
    onPickNumber(chosenNumber);
  };

  //setting a dynamic height put it in the main comp VE because we want to be adjust or any render/state change with this page
  const marginTopDistance = height < 380 ? 30 : 100;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a Number</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={numberInputHandler}
              value={enteredNumber}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StartGameScreen;

// const deviceHeight = Dimensions.get("window").height;

//elevation is an android only property for 'box-shadowing' like in css
//the properties below is how you do it on ios
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    // marginTop: deviceHeight < 380 ? 30 : 100,
    alignItems: "center",
  },

  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: "#ddb52f",
    borderBottomWidth: 2,
    color: "#ddb52f",
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  //allows this flex items available space spread evenly amongst each other in this parent container
  buttonContainer: {
    flex: 1,
  },
});
