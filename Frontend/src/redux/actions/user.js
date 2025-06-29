import axios from "axios";
import { server } from "../../server";
import {
  LoadUserRequest,
  LoadUserSuccess,
  LoadUserFail,
  clearError,
} from "../reducers/user";
import { LoadSellerFail, LoadSellerRequest, LoadSellerSuccess } from "../reducers/seller";

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
