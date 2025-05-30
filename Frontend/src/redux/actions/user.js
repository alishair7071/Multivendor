import axios from "axios";
import { server } from "../../server";
import {
  LoadUserRequest,
  LoadUserSuccess,
  LoadUserFail,
  clearError,
} from "../reducers/user";

//loaduser
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(LoadUserRequest());
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    dispatch(LoadUserSuccess(data.user));
  } catch (e) {
    dispatch(LoadUserFail(e.response.data.message));
  }
};
