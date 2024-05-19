import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  token: "",
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.token = action.payload;
    },
    logout: (state) => {
      state.loggedIn = initialState.loggedIn;
      state.token = initialState.loggedIn;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice;