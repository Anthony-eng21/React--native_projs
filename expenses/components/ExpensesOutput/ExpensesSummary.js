import { View, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";

function ExpensesSummary({ expenses, periodName }) {
  //get the sum of our expenses
  const expensesSum = expenses.reduce((sum, expense) => {
    //returns a new sum for our expenses[]and carries over our last sum from our last execution
    //0 is our initial value arg in this function
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.container} >
      <Text style={styles.period} >{periodName}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    paddingHorizontal: 18,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  period: {
    fontSize: 16, 
    color: GlobalStyles.colors.primary400,
  },

  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500,
  }
});
