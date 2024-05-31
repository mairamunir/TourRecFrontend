import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profiles: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setProfiles: (state, action) => {
      state.profiles = action.payload;
    },
    
  },
});

export const { setProfiles } = appSlice.actions;
export default appSlice;