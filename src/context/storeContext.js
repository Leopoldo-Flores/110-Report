import React from "react";

export default React.createContext({
  cart: [],
  shoppingList: [],
  addProdToCart: (product) => {},
  addToShoppingList: (text) => {},
});
