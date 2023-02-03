import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

import Card from "../components/Card";
import NumberContainer from "../components/game/NumberContainer";
import InstructionText from "../components/InstructionText";
import PrimaryButton from "../components/PrimaryButton";

import Title from "../components/Title";
import GuessLogItem from "../components/game/GuessLogItem";

//exclude parameter makes it so the computer doesn't instantly know our given number at start time
const generateRandomBetween = (min, max, exclude) => {
  //the minimum at the end is a boundary insures we return Intergers instead of 0 - .9 float (i.e prev js projects methods)
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  //if this condition is met we recursively cally generate to do this process again
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return rndNum;
};

let minBoundary = 1;
let maxBoundary = 100;

//helper constant initialGuess is our initial guess state and it's third parameter is the guess gotten through props
const GameScreen = ({ userNumber, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNumber) {
      //this execution will trigger the handler in the app.js which tells us to render this page when we 'lose'
      //making some app state wide side effect
      //pass this [state] length for the value we get on the ongameover in the app FC
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  //when we re-render and navigate to GameScreen from GameOver this insures the boundaries are set to initial game values
  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, [GameScreen]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      //direction => 'lower', 'greater'
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    //would make sense to exclude the last/current guess
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    //includes this random number in this state updating array/list
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
  };

  //this helps us deduct the round number
  const guessRoundsListLength = guessRounds.length;

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Entypo name="thumbs-down" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Entypo name="thumbs-up" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  //landscape mode styling 
  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Entypo name="thumbs-down" size={24} color="white" />
            </PrimaryButton>
          </View>

          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Entypo name="thumbs-up" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Oponents Guess</Title>
      {content}
      <View style={styles.listContainer}>
        {/* {guessRounds.map((guessRound) => (
          <GuessLogItem key={guessRound}>{guessRound}</GuessLogItem>
        ))} */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          //every item in our logic is a unique value so that's a good enough val for the key
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  buttonContainerWide: {
    flexDirection: "row",
    alignItems: "center"
  },
  //this outer container makes the flatlist scrollable
  listContainer: {
    flex: 1,
    padding: 16,
  },
});

export default GameScreen;
