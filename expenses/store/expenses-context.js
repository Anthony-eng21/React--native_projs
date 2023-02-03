import { createContext, useReducer } from "react";

// const DUMMY_EXPENSES = [
//   {
//     id: "e1",
//     description: "A Pair Of Shoes",
//     amount: 55.43,
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
//     description: "The Hobbit",
//     amount: 35.99,
//     date: new Date("2023-01-15"),
//   },

//   {
//     id: "e6",
//     description: "The Hobbit on DVD",
//     amount: 55.43,
//     date: new Date("2023-01-12"),
//   },

//   {
//     id: "e7",
//     description: "Lord of The Rings",
//     amount: 30.29,
//     date: new Date("2023-01-16"),
//   },

// ];

export const ExpensesContext = createContext({
  expenses: [],
  //parameter values we expect to get later in different actions
  addExpense: (expenses) => {},
  setExpenses: ({ id, description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      //payload is our lifted expense Data in this object
      //this makes an immutable state snapshot without accidentally mutating existing data while updating to our new state
      return [action.payload, ...state];
    case "SET": //this inverts the array so that the list orders non-chronologically
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      //getting the index of the item to update immutably after
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      //merges the update description amount and date and override it from its existing values
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      //overall array that should get updated with our existing state array
      const updatedExpenses = [...state];
      //override the item at this index with the updated item
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      // new array based on the old one with one updated item
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

function ExpensesContextProvider({ children }) {
  //initial state of our expenses is an empty array
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  //these dispatch actions work with the above reducer to make magic happen
  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };

  const setExpenses = (expenses) => {
    dispatch({ type: "SET", payload: expenses });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  };

  //bundles all our data and functions to expose them to all the interested components through the below provider FC
  const value = {
    //value that is exposed in our reducer array for our new stateSnapShot
    expenses: expensesState,
    addExpense: addExpense,
    setExpenses: setExpenses,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
