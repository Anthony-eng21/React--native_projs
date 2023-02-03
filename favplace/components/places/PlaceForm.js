import { useCallback, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from "react-native";

import { Colors } from "../../constants/Colors";
import { Place } from "../../models/Place";
import Button from "../UI/Button";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

function PlaceForm({ onCreatePLace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  //these similar state updating functions update our state in PlaceForm <FC> and for submitting our state data
  const changeTitleHandler = (enteredText) => {
    setEnteredTitle(enteredText);
  };

  function takeImageHandler(imageuri) {
    setSelectedImage(imageuri);
  }

  //fix of a side-effect from locationPicker on some state lifted data
  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  function savePlaceHandler() {
    // console.log(enteredTitle);
    // console.log(selectedImage);
    // console.log(pickedLocation);
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    onCreatePLace(placeData);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.golden300,
    fontSize: 16,
  },
  input: {
    marginVertical: 4,
    paddingHorizontal: 6,
    paddingVertical: 8,
    fontSize: 18,
    color: Colors.white100,
    borderBottomColor: Colors.golden300,
    borderBottomWidth: 3,
  },
});
