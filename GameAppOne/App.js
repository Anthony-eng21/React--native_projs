// import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  //this gameover state is initially true
  const [gameIsOver, setGameIsOver] = useState(true);
  //the computer's guessing state value initially 0, the phone hasn't started guessing
  const [guessRounds, setGuessRounds] = useState(0);

  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber);
    //make sure the game isn't over after we guess a number/ doesn't render GOScreen in a place we dont want it to
    setGameIsOver(false);
  };

  const gameOverHandler = (numberOfRounds) => {
    setGameIsOver(true);
    //set the round guess to this argument so the 'phone' can count the length of guesses it took
    setGuessRounds(numberOfRounds);
  };

  //set user number back to null to go to our initial starting app state
  const startNewGameHandler = (guessRounds) => {
    setUserNumber(null);
    setGuessRounds(0);
  };

  //with this helper let we render the GameScreen if the input is a truthy number value in our StartGameScreen component
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  //if userNumber input isn't null pass this condition
  if (userNumber) {
    //we also want to pass the userNumber state snapshot here on the userNumber prop in gamescreen
    //because this is the value we want to "play" with
    //on gameover is used to programmatically render the gameover on an effect on the gamescreen
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  //renders when over and when the guess is a truthy usernumber
  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  //the colors we want for this gradient are on the colors prop and pass in an arr of colors
  //we have to install this gradient package from expo in our package
  //imagebkgrd's resizeMode determines how to resize the image when the frame doesn't match the raw dimensions
  //cover makes sure the image covers all the available space without distorting the image (pretty nice)

  //SafeAreaView allows us to position our screen content under those annoying phone notches(camera, speaker etc...)

  return (
    <>
      <StatusBar style="dark" />
      <LinearGradient
        colors={["lavender", "#4e0329"]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require("./assets/images/backgroundDice.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  //set this on imageStyle prop for the image styles we want
  backgroundImage: {
    opacity: 0.35,
  },
});
