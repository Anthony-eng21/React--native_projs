import PlaceForm from "../components/places/PlaceForm";
import { insertPlace } from "../util/database";

function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    await insertPlace(place);
    //passing this place through route parameters to AllPlaces screen
    // {
    //   place: place,
    // }
    navigation.navigate("AllPlaces");
  }

  return <PlaceForm onCreatePLace={createPlaceHandler} />;
}

export default AddPlace;
