import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  orders: null,
  error: null,
  shopOrders: null,
  adminOrders: null
};

const orderSlice = createSlice({
  initialState,
  name: "order",
  reducers: {
    //get All Orders of a user
    getAllOrdersUserRequest: (state) => {
      state.isLoading = true;
    },

    getAllOrdersUserSuccess: (state, actions) => {
      state.isLoading = false;
      state.orders = actions.payload;
    },

    getAllOrdersUserFailed: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },

    //get All Orders of a shop
    getAllOrdersShopRequest: (state) => {
      state.isLoading = true;
    },

    getAllOrdersShopSuccess: (state, actions) => {
      state.isLoading = false;
      state.shopOrders = actions.payload;
    },

    getAllOrdersShopFailed: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },

    //get all orders for admin
    getAllOrdersAdminRequest: (state) => {
      state.isLoading = true;
    },

    getAllOrdersAdminSuccess: (state, actions) => {
      state.isLoading = false;
      state.adminOrders = actions.payload;
    },

    getAllOrdersAdminFailed: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const orderReducer = orderSlice.reducer;
export const {
  getAllOrdersUserRequest,
  getAllOrdersUserSuccess,
  getAllOrdersUserFailed,
  getAllOrdersShopRequest,
  getAllOrdersShopSuccess,
  getAllOrdersShopFailed,
  getAllOrdersAdminRequest,
  getAllOrdersAdminSuccess,
  getAllOrdersAdminFailed,
  clearError,
} = orderSlice.actions;
