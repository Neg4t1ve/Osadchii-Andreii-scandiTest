import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./Slices/categoriesSlice";
import cartReducer from "./Slices/cartSlice";

export const store = configureStore({
  reducer: {
    category: categoriesReducer,
    cart: cartReducer,
  },
});
