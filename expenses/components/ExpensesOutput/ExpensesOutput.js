import { View, StyleSheet, Text } from "react-native";

import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { GlobalStyles } from "../../constants/styles";

// const DUMMY_EXPENSES = [
//   {
//     id: "e1",
//     description: "A Pair Of Shoes",
//     amount: 59.99,
//     date: new Date("2023-01-01"),
//   },

//   {
//     id: "e2",
//     description: "A Magazine",
//     amount: 19.99,
//     date: new Date("2022-12-23"),
//   },

//   {
//     id: "e3",
//     description: "A Pair Of Trousers",
//     amount: 89.29,
//     date: new Date("2022-01-05"),
//   },

//   {
//     id: "e4",
//     description: "Some Bananas",
//     amount: 5.72,
//     date: new Date("2022-01-07"),
//   },

//   {
//     id: "e5",
//     description: "A Pack of Gum",
//     amount: 1.19,
//     date: new Date("2022-01-05"),
//   },
// ];

//expenses is a prop value of some array of objects with data
//expensesPeriod is a prop value with some primitve types with some description of our expenses period

function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
