import { createContext, useState } from "react";
import { add, set } from "react-native-reanimated";

export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

const FavoritesContextProvider = ({ children }) => {
  const [favoriteMealIds, setFavoriteMealIds] = useState([]);

  //makes a new array and returns the newest state snapShot
  function addFavorite(id) {
    setFavoriteMealIds((currentFavIds) => [...currentFavIds, id]);
  }

  function removeFavorite(id) {
    setFavoriteMealIds((currentFavIds) =>
      currentFavIds.filter((mealId) => mealId !== id)
    );
  }

  //we want to point to this value constant with our setup context values to this value prop on FavoritesContext.Provider
  const value = {
    //this ids field is our statesnap shot we set up 
    ids: favoriteMealIds,
    //on the left is the key for this prop to execute into other
    //components while on the right is the function we want to bind to that 'key'
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };
//without the value prop we get a missing value prop error
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export default FavoritesContextProvider;
