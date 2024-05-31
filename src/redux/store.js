import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./user.reducer";

const rootReducer = combineReducers({ user: userSlice.reducer });

const store = configureStore({
  reducer: rootReducer,
});

export default store;

// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import userSlice from "./user.reducer";
// import appSlice from "./app.reducer";
// const rootReducer = combineReducers({ user: userSlice.reducer,
// app: appSlice.reducer, });

// const store = configureStore({
//   reducer: rootReducer,
// });

// export default store;