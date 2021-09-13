import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import activateReducer from "./Slices/activateSlice";

const store = configureStore({
  reducer: { authReducer, activateReducer },
});

export default store;
