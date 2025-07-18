import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  event: null,
  events: null,
  success: null,
  message: null,
  error: null,
  allEvents: null
};

const eventSlice = createSlice({
  initialState,
  name: "event",

  reducers: {
    eventCreateRequest: (state) => {
      state.isLoading = true;
    },

    eventCreateSuccess: (state, actions) => {
      state.isLoading = false;
      state.event = actions.payload;
      state.success = true;
    },

    eventCreateFail: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
      state.success = false;
    },

    //get All events of a shop
    getAllEventsShopRequest: (state) => {
      state.isLoading = true;
    },

    getAllEventsShopSuccess: (state, actions) => {
      state.isLoading = false;
      state.events = actions.payload;
    },

    getAllEventsShopFailed: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },

    //delete all events
    deleteEventRequest: (state) => {
      state.isLoading = true;
      console.log("delete event request is called");
    },

    deleteEventSuccess: (state, actions) => {
      state.isLoading = false;
      state.message = actions.payload.message;
      console.log("delete event success is called");

      console.log("events before deleted:" + state.events);

      const updatedEvents = state.events.filter(
        (item) => item._id != actions.payload.id
      );
      console.log("events after deleted:" + updatedEvents);

      state.events = updatedEvents;
    },

    deleteEventFailed: (state, actions) => {
      state.isLoading = false;
      state.message = actions.payload;
    },

    // get all events
    getAlleventsRequest: (state) => {
      state.isLoading = true;
    },
    getAlleventsSuccess: (state, action) => {
      state.isLoading = false;
      state.allEvents = action.payload;
    },
    getAlleventsFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const eventReducer = eventSlice.reducer;
export const {
  eventCreateRequest,
  eventCreateSuccess,
  eventCreateFail,
  getAllEventsShopRequest,
  getAllEventsShopSuccess,
  getAllEventsShopFailed,
  deleteEventRequest,
  deleteEventSuccess,
  deleteEventFailed,
  getAlleventsRequest,
  getAlleventsSuccess,
  getAlleventsFailed,
  clearErrors,
} = eventSlice.actions;
