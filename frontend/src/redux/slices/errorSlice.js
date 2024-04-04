import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action) => {
      return action.payload;
    },
    clearError: () => {
      return initialState;
    },
  },
});

// деструкторизация объекта errorSlice
export const { setError, clearError } = errorSlice;

export const selectErrorMessage = (state) => state.error;

export default errorSlice.reducer;
