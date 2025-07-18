import axios from "axios";
import { server } from "../../server";
import {
  productCreateRequest,
  productCreateSuccess,
  productCreateFail,
  getAllProductsShopRequest,
  getAllProductsShopFailed,
  getAllProductsShopSuccess,
  deleteProductFailed,
  deleteProductRequest,
  deleteProductSuccess,
  getAllProductsRequest,
  getAllProductsSuccess,
  getAllProductsFailed,
} from "../reducers/product.js";
import { toast } from "react-toastify";

//create product
export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch(productCreateRequest());

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/product/create-product`,
      newForm,
      config
    );

    dispatch(productCreateSuccess(data.product));
    console.log(data);
    return data.success; 

  } catch (error) {
   // toast.error(error.response.data.message);
    dispatch(productCreateFail(error.response.data.message));
  }
};



//get all products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
    try {
    dispatch(getAllProductsShopRequest());

    const { data } = await axios.get(`${server}/product/get-all-products-shop/${id}`);

    dispatch(getAllProductsShopSuccess(data.products));
    console.log(data);
    return data.success;

  } catch (error) {
   // toast.error(error.response.data.message);
    dispatch(getAllProductsShopFailed(error.response.data.message));
  }
};


//delete product of a shop
export const deleteProduct= (id)=> async(dispatch)=>{
  try {
    console.log("entered in try")
    dispatch(deleteProductRequest());

    const {data}= await axios.delete(`${server}/product/delete-shop-product/${id}`, {withCredentials: true});

    console.log(data);
    dispatch(deleteProductSuccess({message: data.message, id: data.id}));
    
  } catch (error) {
    console.log("entered in catch")
    console.log(error);
    dispatch(deleteProductFailed(error.response.data.message));
  }
}



// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch(getAllProductsRequest());

    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch(getAllProductsSuccess(data.products));

  } catch (error) {
    dispatch(getAllProductsFailed(error.response.data.message));
  }
};


