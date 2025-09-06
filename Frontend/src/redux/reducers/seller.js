import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSeller: false,
  isLoading: true,
  seller: null,
  error: null,
  allSellers: [],
  allSellersLoading: true
};

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    LoadSellerRequest: (state) => {
      state.isLoading = true;
    },

    LoadSellerSuccess: (state, action) => {
      state.isLoading = false;
      state.isSeller = true;
      state.seller = action.payload;
    },
    LoadSellerFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
    },


    //get all sellers for admin
    getAllSellersRequest: (state) => {
      state.allSellersLoading = true;
    },
    getAllSellersSuccess: (state, action) => {
      state.allSellersLoading = false;
      state.allSellers = action.payload;
    },
    getAllSellersFail: (state, action) => {
      state.allSellersLoading = false;
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
    logOutSeller: (state) => {
      state.seller = null;
      state.isSeller = false;
    },
  },
});

export const sellerReducer = sellerSlice.reducer;
export const {
  LoadSellerRequest,
  LoadSellerSuccess,
  LoadSellerFail,
  clearError,
  logOutSeller,
  getAllSellersRequest,
  getAllSellersSuccess,
  getAllSellersFail,
} = sellerSlice.actions;
