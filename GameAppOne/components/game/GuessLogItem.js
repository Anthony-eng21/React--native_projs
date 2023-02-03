import { View, Text, StyleSheet } from "react-native";

const GuessLogItem = ({ roundNumber, guess }) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>#{roundNumber}</Text>
      <Text style={styles.itemText}>Opponents Guess: {guess}</Text>
    </View>
  );
};

export default GuessLogItem;

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderColor: 'white',
        borderWidth: 2, 
        borderRadius: 40,
        padding: 12,
        marginVertical: 8, 
        backgroundColor: "darkgoldenrod",
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.25,
        shadowRadius: 3,
    },
    itemText: {
        fontWeight: '700',
    }
});