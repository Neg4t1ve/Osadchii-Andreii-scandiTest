import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categoriesReducer from "..//Slices/categoriesSlice";
import cartReducer from "../Slices/cartSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  category: categoriesReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["tax", "quantity", "total"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
