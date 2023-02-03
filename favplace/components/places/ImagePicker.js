import { View, Alert, Image, Text, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Colors } from "../../constants/Colors";
import { useState } from "react";
import OutLinedButton from "../UI/OutlinedButton";

function ImagePicker({ onTakeImage }) {
  const [pickedImage, setPickedImage] = useState();

  //first arg in this hook is an {}. requestPermission() important for ios permissions
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  //this function returns true or null for false
  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      //this function gets the permission
      const permissionResponse = await requestPermission();

      //return a convenient boolean value for granting permission with this granted prop
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }

    //we are in neither of these states so return true because we have the camera permissions
    return true;
  }

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    //image.uri is deprecated in SDK 47+  we get access to the image's props by going into the assets array
    setPickedImage(image.assets[0].uri);

    //forward this via props up to our PlaceForm <FC>
    onTakeImage(image.assets[0].uri);
  };
  //fallback helper variable
  let imagePreview = <Text>No image taken yet</Text>;

  //this state when we want to preview an image
  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutLinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutLinedButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 225,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightgray500,
    borderRadius: 4,
  },
  image: {
    overflow: "hidden",
    width: "100%",
    height: "100%",
  },
});
