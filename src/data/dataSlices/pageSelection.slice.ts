import { createSlice } from "@reduxjs/toolkit";

export const pageSelectorSlice = createSlice({
  name: "pageSelector",
  initialState: {
    currentSelector: "dashboard",
  },
  reducers: {
    setCurrentSelector: (state, action) => {
      return {
        ...state,
        currentSelector: action.payload,
      };
    },
  },
});

export const { setCurrentSelector } = pageSelectorSlice.actions;
export const currentSelector = (state: any) => state;
export default pageSelectorSlice.reducer;
