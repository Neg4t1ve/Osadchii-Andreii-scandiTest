import { createSlice } from "@reduxjs/toolkit";

export const currencySlice = createSlice({
  name: "currency",
  initialState: {
    activeCurrency: "$",
  },

  reducers: {
    setCurrency: (state, action) => {
      state.activeCurrency = action.payload;
    },
  },
});

export const { setCurrency } = currencySlice.actions;

export default currencySlice.reducer;
