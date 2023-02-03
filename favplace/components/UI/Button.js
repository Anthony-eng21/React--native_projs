import { Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
function Button({ onPress, children }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    backgroundColor: Colors.gray700,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 6, height: 6 },
    shadowRadius: 4,
    borderRadius: 4,
  },
  pressed: {
    opacity: 0.5,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.golden300,
  },
});
