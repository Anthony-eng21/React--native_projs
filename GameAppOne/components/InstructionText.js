import { Text, StyleSheet } from "react-native";

//this bracket allows us to use this style prop which acts as a cascading style prop in the gamescreen comp
// where we can add additonal styles to this component in specefic areas of our app
const InstructionText = ({ children, style }) => {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
};

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    color: "#ddb52f",
    fontSize: 24,
  },
});
