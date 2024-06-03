import { createSlice } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";

const initialState = {
  loggedIn: false,
  token: "",
  roles : {
    superAdmin: false,
    admin: false,
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.token = action.payload;
      
       // Decode the token to extract user roles
       const decodedToken = jwtDecode(action.payload);
       state.roles.superAdmin = decodedToken.superAdmin;
       state.roles.admin = decodedToken.admin;
    },
    logout: (state) => {
      state.loggedIn = initialState.loggedIn;
      state.token = initialState.token;
      state.roles = initialState.roles;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice;

