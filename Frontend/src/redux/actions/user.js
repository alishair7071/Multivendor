import axios from "axios";
import { server } from "../../server";
import {
  LoadUserRequest,
  LoadUserSuccess,
  LoadUserFail,
  clearError,
  updateUserInfoFail,
  updateUserInfoSuccess,
  updateUserInfoRequest,
  updateUserAddressesRequest,
  updateUserAddressesSuccess,
  updateUserAddressesFail,
  deleteUserAddressRequest,
  deleteUserAddressSuccess,
  deleteUserAddressFail
} from "../reducers/user";
import {
  LoadSellerFail,
  LoadSellerRequest,
  LoadSellerSuccess,
} from "../reducers/seller";

//loaduser
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(LoadUserRequest());
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    dispatch(LoadUserSuccess(data.user));
  } catch (e) {
    dispatch(LoadUserFail(e.message));
  }
};

//load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch(LoadSellerRequest());
    const { data } = await axios.get(`${server}/shop/getSeller`, {
      withCredentials: true,
    });
    dispatch(LoadSellerSuccess(data.seller));
  } catch (e) {
    dispatch(LoadSellerFail(e.message));
  }
};

//update user info
export const updateUserInformation =
  ({ name, email, password, phoneNumber }) =>
  async (dispatch) => {
    try {
      dispatch(updateUserInfoRequest());
      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        { name, email, password, phoneNumber },
        {
          withCredentials: true,
        }
      );
      dispatch(updateUserInfoSuccess(data.user));
      return data;
    } catch (e) {
      dispatch(updateUserInfoFail(e.response.data.message));
      return e.response.data;
    }
  };

//update user addresses
export const updateUserAddresses =
  ({ country, city, address1, address2, zipCode, addressType }) =>
  async (dispatch) => {
    try {
      dispatch(updateUserAddressesRequest());
      const { data } = await axios.put(
        `${server}/user/update-user-addresses`,
        { country, city, address1, address2, zipCode, addressType },
        {
          withCredentials: true,
        }
      );
      dispatch(updateUserAddressesSuccess(data.user));
      return data;
    } catch (e) {
      dispatch(updateUserAddressesFail(e.response.data.message));
      return e.response.data;
    }
  };

//delete user address
export const deleteUserAddress = (addressId) => async (dispatch) => {
  try {
    dispatch(updateUserAddressesRequest());
    const { data } = await axios.delete(
      `${server}/user/delete-user-address/${addressId}`,
      {
        withCredentials: true,
      }
    );
    dispatch(updateUserAddressesSuccess(data.updatedUser));
    return data;
  } catch (e) {
    dispatch(updateUserAddressesFail(e.response.data.message));
    return e.response.data;
  }
};
