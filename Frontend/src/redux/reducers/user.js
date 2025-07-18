import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LoadUserRequest: (state) => {
      state.loading = true;
    },

    LoadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    LoadUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    logOutUser: (state) =>{
      state.user= null;
      state.isAuthenticated= false;
    }
  },
});

export const userReducer= userSlice.reducer;
export const { LoadUserRequest, LoadUserSuccess, LoadUserFail, clearError, logOutUser}= userSlice.actions;