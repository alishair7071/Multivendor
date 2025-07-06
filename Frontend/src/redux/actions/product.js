import axios from "axios";
import { server } from "../../server";
import {
  productCreateRequest,
  productCreateSuccess,
  productCreateFail,
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
