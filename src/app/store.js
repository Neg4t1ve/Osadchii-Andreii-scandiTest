import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./Slices/categoriesSlice";
import currencyReducer from "./Slices/currencySlice";

export const store = configureStore({
  reducer: {
    category: categoriesReducer,
    currency: currencyReducer,
  },
});
