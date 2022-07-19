import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
  name: "category",
  initialState: {
    activeCategory: "",
  },

  reducers: {
    setCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
});

export const { setCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
