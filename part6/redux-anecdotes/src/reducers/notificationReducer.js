import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    addNotification: (state, action) => action.payload,
    clearNotification: () => null,
  },
});

export const { addNotification, clearNotification } = notificationSlice.actions;

export const setNotification = (notification, timePerSecond) => {
  return async (dispatch) => {
    dispatch(addNotification(notification));
    setTimeout(() => dispatch(clearNotification()), timePerSecond * 1000);
  };
};

export default notificationSlice.reducer;
