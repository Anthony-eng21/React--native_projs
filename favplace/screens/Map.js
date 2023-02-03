import { useCallback, useLayoutEffect, useState } from "react";
import { StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";

import IconButton from "../components/UI/IconButton";

function Map({ navigation, route }) {
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  };

  //inital location is our initial state it's either undefined or it is an object of this initialLocation{}
  const [selectedLocation, setsSelectedLocation] = useState(initialLocation);

  const region = {
    longitude: initialLocation ? initialLocation.lng : 37.78,
    latitude: initialLocation ? initialLocation.lat : -122.43,
    latitudeDelt: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event) {
    // console.log(event);
    //another guard close so we cant set location in a new place in read only mode
    if(initialLocation){
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    //allows the coordinates to our marker via this handler function and state
    setsSelectedLocation({ lat: lat, lng: lng });
  }

  //useCallback because we don't want an infinite loop. because this held data
  //is likely to render nonstop when this handler gets called on press
  const savedPickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No Location Picked!",
        "You have to pick a location (by tapping on the map) first!"
      );
      return;
    }

    //with navigate() the second arg is some route parameter data we want to send along with this navigation for this screen to make it available to any comp in this screen
    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  //the code to add the header button and have same data as soon as we pick somewhere on the map
  //and send some route params in the savedPickedLocationhandler for the coords we want to preview when we
  //go back to the map
  useLayoutEffect(() => {
    //guard clause for if we have the location already so the below code won't run and render that button in read only "mode"
    if (initialLocation) {
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="pin"
          color={tintColor}
          size={24}
          onPress={savedPickedLocationHandler}
        />
      ),
    });
  }, [navigation, savedPickedLocationHandler, initialLocation]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation?.lat,
            longitude: selectedLocation?.lng,
          }}
        />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
