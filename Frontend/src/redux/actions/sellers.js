import axios from "axios";
import { server } from "../../server";
import {
  getAllSellersFail,
  getAllSellersRequest,
  getAllSellersSuccess,
} from "../reducers/seller";

export const getAllSellersAdminFun = () => async (dispatch) => {
  try {
    dispatch(getAllSellersRequest());
    const { data } = await axios.get(`${server}/shop/admin-all-sellers`, {
      withCredentials: true,
    });

    dispatch(getAllSellersSuccess(data.sellers));
  } catch (error) {
    dispatch(getAllSellersFail(error.response.data.message));
  }
};
