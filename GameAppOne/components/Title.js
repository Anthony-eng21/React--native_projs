import { Text, StyleSheet } from "react-native";

const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rebeccapurple',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: 'white',
        opacity: "0.65",
        padding: 12,
        maxWidth: '80%',
        width: 300,
      },
})

export default Title;
