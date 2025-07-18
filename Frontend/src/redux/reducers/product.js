import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  product: null,
  products: null,
  allProducts: null,
  success: null,
  message: null,
  error: null,
};

const productSlice = createSlice({
  initialState,
  name: "product",

  reducers: {
    //create a product
    productCreateRequest: (state) => {
      state.isLoading = true;
    },

    productCreateSuccess: (state, actions) => {
      state.isLoading = false;
      state.product = actions.payload;
      state.success = true;
    },

    productCreateFail: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
      state.success = false;
    },

    //get All Products of a shop
    getAllProductsShopRequest: (state) => {
      state.isLoading = true;
    },

    getAllProductsShopSuccess: (state, actions) => {
      state.isLoading = false;
      state.products = actions.payload;
    },

    getAllProductsShopFailed: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },

    //delete a product of the shop
    deleteProductRequest: (state) => {
      state.isLoading = true;
    },

    deleteProductSuccess: (state, actions) => {
      state.isLoading = false;
      state.message = actions.payload.message;

      const updatedProducts = state.products.filter(
        (item) => item._id != actions.payload.id
      );
      state.products = updatedProducts;
    },

    deleteProductFailed: (state, actions) => {
      state.isLoading = false;
      state.message = actions.payload;
    },

    // get all products
    getAllProductsRequest: (state) => {
      state.isLoading = true;
    },
    getAllProductsSuccess: (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
    },
    getAllProductsFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const productReducer = productSlice.reducer;
export const {
  productCreateRequest,
  productCreateSuccess,
  productCreateFail,
  getAllProductsShopRequest,
  getAllProductsShopSuccess,
  getAllProductsShopFailed,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailed,
  clearErrors,
  getAllProductsRequest,
  getAllProductsSuccess,
  getAllProductsFailed
} = productSlice.actions;
