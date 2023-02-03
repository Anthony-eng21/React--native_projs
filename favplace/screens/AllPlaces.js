import { useEffect, useState } from "react";
import PlacesList from "../components/places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isfocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      //get the places coming from our db with this state updating function
      setLoadedPlaces(places);
    }

    if (isfocused) {
      //brand new array of places with all our places and our new place {} with route params
      // setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
      loadPlaces();
    }
  }, [isfocused]);

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
