import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../features/authSlice"

const store = configureStore({
    reducer: authReducers
});

export default store;