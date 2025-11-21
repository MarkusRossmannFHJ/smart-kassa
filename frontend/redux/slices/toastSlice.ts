import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showWarning: true,
};

const toastSlice = createSlice({
  name: "Toast",
  initialState,
  reducers: {
    ToastWarningShowed: (state) => {
      state.showWarning = false;
    },
  },
});

export const {ToastWarningShowed} = toastSlice.actions;

export default toastSlice.reducer;
