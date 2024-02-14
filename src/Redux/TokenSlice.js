import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
    token: null,
};

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        getUserData: (state) => {
            const encoded = localStorage.getItem('userToken');
            if (encoded) {
                const decoded = jwtDecode(encoded);
                state.token = decoded;
            }
        },
        deleteUserData: (state) => {
            localStorage.removeItem('userToken');
            state.token = null;
        },
    },
});

export const { getUserData, deleteUserData } = tokenSlice.actions;
export const tokenReducer = tokenSlice.reducer;
