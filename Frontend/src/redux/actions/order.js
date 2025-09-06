import axios from "axios";
import {
  getAllOrdersAdminFailed,
  getAllOrdersAdminRequest,
  getAllOrdersAdminSuccess,
  getAllOrdersShopFailed,
  getAllOrdersShopRequest,
  getAllOrdersShopSuccess,
  getAllOrdersUserFailed,
  getAllOrdersUserRequest,
  getAllOrdersUserSuccess,
} from "../reducers/order";
import { server } from "../../server";

//get all orders of a user
export const getAllOrdersUserFun = (userId) => async (dispatch) => {
  try {
    dispatch(getAllOrdersUserRequest());

    const { data } = await axios.get(
      `${server}/order/get-all-orders/${userId}`
    );

    dispatch(getAllOrdersUserSuccess(data.orders));
  } catch (error) {
    dispatch(getAllOrdersUserFailed(error.response.data.message));
  }
};

//get all orders of a shop
export const getAllOrdersShopFun = (shopId) => async (dispatch) => {
  try {
    dispatch(getAllOrdersShopRequest());

    const { data } = await axios.get(
      `${server}/order/get-seller-all-orders/${shopId}`
    );

    dispatch(getAllOrdersShopSuccess(data.orders));
  } catch (error) {
    dispatch(getAllOrdersShopFailed(error.response.data.message));
  }
};

//get all orders for admin
export const getAllOrdersAdminFun = () => async (dispatch) => {
  try {
    dispatch(getAllOrdersAdminRequest());

    const { data } = await axios.get(`${server}/order/admin-all-orders`, {
      withCredentials: true,
    });

    dispatch(getAllOrdersAdminSuccess(data.orders));
  } catch (error) {
    dispatch(getAllOrdersAdminFailed(error.response.data.message));
  }
};
