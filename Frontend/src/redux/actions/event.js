import axios from "axios";
import { server } from "../../server";
import {
  eventCreateRequest,
  eventCreateSuccess,
  eventCreateFail,
  getAllEventsShopRequest,
  getAllEventsShopFailed,
  getAllEventsShopSuccess,
  deleteEventFailed,
  deleteEventRequest,
  deleteEventSuccess,
  getAlleventsFailed,
  getAlleventsRequest,
  getAlleventsSuccess,
} from "../reducers/event.js";
import { toast } from "react-toastify";

//create event
export const createEvent = (newForm) => async (dispatch) => {
  try {
    dispatch(eventCreateRequest());

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/event/create-event`,
      newForm,
      config
    );

    dispatch(eventCreateSuccess(data.event));
    console.log(data);
    return data.success;
  } catch (error) {
    // toast.error(error.response.data.message);
    dispatch(eventCreateFail(error.response.data.message));
  }
};

//get all events of a shop
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch(getAllEventsShopRequest());

    const { data } = await axios.get(`${server}/event/get-all-events/${id}`);

    dispatch(getAllEventsShopSuccess(data.events));
    console.log(data);
    return data.success;
  } catch (error) {
    // toast.error(error.response.data.message);
    dispatch(getAllEventsShopFailed(error.response.data.message));
  }
};

//delete event
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch(deleteEventRequest());

    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
      { withCredentials: true }
    );
    console.log();

    dispatch(deleteEventSuccess({ message: data.message, id: data.id }));
  } catch (error) {
    dispatch(deleteEventFailed(error.response.data.message));
  }
};

//get all events
export const getAllEvents = () => async (dispatch) => {
  try {

    console.log("enterd in try in getAllEvents")
    dispatch(getAlleventsRequest());

    const { data } = await axios.get(`${server}/event/get-all-events`);
    console.log("allEvents: "+ data.events.length);

    dispatch(getAlleventsSuccess(data.events));

  } catch (error) {
    dispatch(getAlleventsFailed(error.response.data.message));
  }
};
