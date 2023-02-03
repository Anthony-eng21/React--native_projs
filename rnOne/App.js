import { useState } from "react";
import {
  Button,

  //allows for styling auto-completion and validation
  StyleSheet,

  //basically a string
  // Text,

  //basically an input lke in web
  // TextInput,

  //basically a div component
  View,

  //makes child elements scrollable wrap view around it as a parent container for layout work around
  //good for limited amounts of content i.e an article
  // ScrollView,

  //flatlist takes in some data tpically from some state
  FlatList,
} from "react-native";

import { StatusBar } from "expo-status-bar";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  const startAddGoalHandler = () => {
    setModalIsVisible(true);
  };

  //logic for our cancel button
  const endAddGoalHandler = () => {
    setModalIsVisible(false);
  };

  //got that enteredGoaltext from the nested GoalInput onAdd prop
  const addGoalHandler = (enteredGoalText) => {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    //closes the modal on goal submission
    endAddGoalHandler();
  };

  //wanna take in an id to delete unique items
  const deleteGoalHandler = (id) => {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="plum"
          onPress={startAddGoalHandler}
        />
        <GoalInput
          visible={modalIsVisible}
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  style
                  id={itemData.item.id}
                  text={itemData.item.text}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}
//React Native inline styling similiar to css its valid but not accepted=>
//style={{ margin: 16, borderWidth: 2, borderColor: "grey", padding: 16 }}

//The StyleSheet Object provides css auto-completion and validation
const styles = StyleSheet.create({
  appContainer: {
    //occupies 100% of the space shared between child ele's
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#311b6b",
  },
  goalsContainer: {
    flex: 5,
  },
});
