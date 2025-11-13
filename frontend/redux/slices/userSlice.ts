import { createSlice } from "@reduxjs/toolkit";
import type { USER_DTO } from "../../constants/User";

const initialState: USER_DTO = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInUser: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
    },
    signOutUser: (state) => {
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.phoneNumber = "";
    },
  },
});

export const { signInUser, signOutUser } = userSlice.actions;

export default userSlice.reducer;
