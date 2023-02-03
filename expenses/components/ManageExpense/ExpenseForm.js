import { View, StyleSheet, Text, Alert } from "react-native";
import { useState } from "react";

import Input from "./Input";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
  const [inputs, setInputs] = useState({
    //this object manages all the state input values
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : null,
      //if we have defaultvalues this'll yield true if not than false
      isValid: true,
    },
    date: {
      value: defaultValues
        ? defaultValues.date.toISOString().slice(0, 10)
        : null,
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        //gets the first param as the key and sets the value to the enteredValue data
        //lets us dynamically target and set the property names for each listened to form field's state
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    //object with all our converted state input values
    const expenseData = {
      amount: +inputs.amount.value,
      //converts date strings into date objects
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    //pass this object and state data to our screen on this onSubmit prop

    //!isNan extra check for number type
    //if it is not NAN and the value is greater than 0 this input is valid
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    //if one of these are false but the rest are fine thats enough to stop submission thats why we use || here
    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //show feedback
      // Alert.alert("Invalid Input", "Please Check your input values");
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            //makes it hard to input text
            keyboardType: "decimal-pad",
            //second arg in bind targets the key we want to to target the entered string data
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          // autoCorrect: false // default is true
          // autoCapitalize: 'words' : 'none' //default sentences
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  //we fixed some layout breakage by making Input.FC more configurable
  rowInput: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    marginHorizontal: 30,
  },
  button: {
    minWidth: 100,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
