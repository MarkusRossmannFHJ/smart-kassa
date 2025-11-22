import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    finishLoading(state) {
      state.isLoading = false;
    },

    setAuthenticated(state) {
      state.isAuthenticated = true;
      state.isLoading = false;
    },

    setUnauthenticated(state) {
      state.isAuthenticated = false;
      state.isLoading = true
    }
  }
})

export const {
  startLoading,
  finishLoading,
  setAuthenticated,
  setUnauthenticated,
} = authSlice.actions;

export default authSlice.reducer;



