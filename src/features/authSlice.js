import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    userData: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, actions) => {
            state.isLoggedIn = true;
            state.userData = actions.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userData = null;
        }
    }
});

export default authSlice.reducer;

export const { login, logout } = authSlice.actions;