import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import UserModel from "../Models/UserModel";

// Reducer for register:
function register(currentState: UserModel, action: PayloadAction<UserModel>): UserModel {
    const registeredUser = action.payload;
    const newState = registeredUser;
    return newState;
}

// Reducer for login:
function login(currentState: UserModel, action: PayloadAction<UserModel>): UserModel {
    const loggedInUser = action.payload;
    const newState = loggedInUser;
    return newState;
}

// Reducer for logout:
function logout(currentState: UserModel, action: PayloadAction): UserModel {
    return null;
}

// Creating the slice:
const authSlice = createSlice({
    name: "auth",
    initialState: null,
    reducers: { register, login, logout }
});

// Expose a single object containing functions for creating Action objects:
export const authActionCreators = authSlice.actions;

// Expose a single object containing all reducers:
export const authReducersContainer = authSlice.reducer;
