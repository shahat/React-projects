import {  configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./auth";
import counterSlice from "./counter";


export const authActions = AuthSlice.actions;
export const counterActions = counterSlice.actions;

const store = configureStore({
  reducer: { counter: counterSlice.reducer, auth: AuthSlice.reducer },
});
export default store;
