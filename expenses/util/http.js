import axios from "axios";

const BACKEND_URL =
  "https://native-expense-app-b5388-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData  
  );
  //this name prop holds the unique id firebase generates for us
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = [];
//   console.log(response.data);
  for (const key in response.data) {
    const expenseObject = {
      id: key,
      //we dynaimcally access a property stored in that key/id property
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObject);
  }
  return expenses;
}

//no need for async await since we're just returning the promise
export function updateExpense(id, expenseData) {
  //dynamic id for sepcific expenses in our put/updating task
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export async function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
