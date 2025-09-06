import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null,
  error: null,
  allUsers: [],
  allUsersLoading: true,
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
    logOutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },

    //update user info
    updateUserInfoRequest: (state) => {
      state.loading = true;
    },
    updateUserInfoSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    updateUserInfoFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //update user addresses
    updateUserAddressesRequest: (state) => {
      state.loading = true;
    },
    updateUserAddressesSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    updateUserAddressesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //delete user addresses
    deleteUserAddressRequest: (state) => {
      state.loading = true;
    },
    deleteUserAddressSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    deleteUserAddressFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //get all users for admin
    getAllUsersRequest: (state) => {
      state.allUsersLoading = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.allUsersLoading = false;
      state.allUsers = action.payload;
    },
    getAllUsersFail: (state, action) => {
      state.allUsersLoading = false;
      state.error = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const {
  LoadUserRequest,
  LoadUserSuccess,
  LoadUserFail,
  clearError,
  logOutUser,
  updateUserInfoRequest,
  updateUserInfoSuccess,
  updateUserInfoFail,
  updateUserAddressesRequest,
  updateUserAddressesSuccess,
  updateUserAddressesFail,
  deleteUserAddressRequest,
  deleteUserAddressSuccess,
  deleteUserAddressFail,
  getAllUsersRequest,
  getAllUsersSuccess,
  getAllUsersFail,
} = userSlice.actions;
