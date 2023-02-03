import { useNavigation } from "@react-navigation/native";
import { FlatList, View, Text, StyleSheet } from "react-native";
import PlaceItem from "./PlaceItem";

function PlacesList({ places }) {
  const navigation = useNavigation()

  //get id from the prop forwarded to us via props, bind and route.params
  function selectPlaceHandler(id){
    //extract the placeId from the placeDetail screen through route.params
    navigation.navigate('PlaceDetails', {
      placeId: id
    })
  }
  //Fallback
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallBackContainer}>
        <Text style={styles.fallBackText}>
          No places added yet - start adding some
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} onSelect={selectPlaceHandler}  />}
    />
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 18,
  },
  fallBackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallBackText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
});
