import { createSlice } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";

const initialState = {
  loggedIn: false,
  token: "",
  roles : {
    superAdmin: false,
    admin: false,
    province: null 
  },
  firstName: "", //new
  lastName: "", //new
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
       state.roles.province =decodedToken.province;
       state.firstName = action.payload.firstName; // Set the firstName from the action payload
       state.lastName = action.payload.lastName;   
    },
    logout: (state) => {
      state.loggedIn = initialState.loggedIn;
      state.token = initialState.token;
      state.roles = initialState.roles;
      state.firstName = initialState.firstName; // Reset the firstName
      state.lastName = initialState.lastName; 
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice;

