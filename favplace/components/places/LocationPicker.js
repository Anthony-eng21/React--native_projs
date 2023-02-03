import { View, StyleSheet, Alert, Image, Text } from "react-native";
import { useState, useEffect } from "react";

//getCurrentPositionAsync returns a promise this operation gets our location asynchronously
import { getCurrentPositionAsync, PermissionStatus } from "expo-location";
//request permission for the foreground location
import { useForegroundPermissions } from "expo-location/build/Location";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import { getMapPreview, getAddress } from "../../util/location";

import { Colors } from "../../constants/Colors";
import OutLinedButton from "../UI/OutlinedButton";

function LocationPicker({ onPickLocation }) {
  const [pickedLocation, setPickedLocation] = useState();
  //convenience boolean for sideEffects for passing data(route.params) from screens(databases)
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const route = useRoute();

  //1st arg is a storing object. 2nd is a request permissions function similiar to the use camera hook
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      //pickedLat & pickedLng because we set these properties up in out Map component on the navigate prop in our second arg
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  //forward this now state('formLocationData') data via props and some sideEffect
  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        //reverse geocoding logic along with this util function 
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.lng
        );
        //merged into an object with the human readable address and the coordinates and passed to this prop function state we lift to the place form where we execute this code
        onPickLocation({ ...pickedLocation, address: address });
      }
    }
    handleLocation();
    //this causes a side effect in our logic when this prop updating data changes unnecessarily on this prop
  }, [pickedLocation, onPickLocation]); //fix with useCallback hook later on in placeForm on the picklocationhandler!

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      //this function gets the permission
      const permissionResponse = await requestPermission();

      //return a convenient boolean value for granting permission with this granted prop
      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }

    //we are in neither of these states so return true because we have the camera permissions
    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }
  
  //helper variable for some state
  let locationPreview = <Text>No Location picked yet!</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutLinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutLinedButton>
        <OutLinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutLinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    height: 200,
    width: "100%",
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightgray500,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
    overflow: "hidden",
  },
});
