import { createSlice } from "@reduxjs/toolkit";


const initialState={
    isLoading: true,
    product: null,
    success: null,
    error: null
}

const productSlice= createSlice({
    initialState,
    name: "product",

    reducers: {
        productCreateRequest: (state)=> {
            state.isLoading= true;
        },

        productCreateSuccess: (state, actions)=>{
            state.isLoading= false;
            state.product= actions.payload;
            state.success= true;
        },

        productCreateFail: (state, actions)=>{
            state.isLoading= false;
            state.error= actions.payload;
            state.success= false;
        },

        clearErrors: (state)=>{
            state.error= null;
        }
    }
});


export const productReducer= productSlice.reducer;
export const { productCreateRequest, productCreateSuccess, productCreateFail, clearErrors}= productSlice.actions;