import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./Slices/categoriesSlice";

export const store = configureStore({
  reducer: {
    category: categoriesReducer,
  },
});
