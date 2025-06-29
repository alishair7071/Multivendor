import { createReducer } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSeller: false,
  isLoading: false,
  seller: null,
  error: null,
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
    clearError: (state) => {
      state.error = null;
    },
    logOutSeller: (state) =>{
      state.seller= null;
      state.isSeller= false;
    }
  },
});

export const sellerReducer= sellerSlice.reducer;
export const { LoadSellerRequest, LoadSellerSuccess, LoadSellerFail, clearError, logOutSeller}= sellerSlice.actions;