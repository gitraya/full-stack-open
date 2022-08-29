import { createSlice } from "@reduxjs/toolkit";
let timeoutId = 0;

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
    clearTimeout(timeoutId);
    dispatch(addNotification(notification));
    timeoutId = setTimeout(
      () => dispatch(clearNotification()),
      timePerSecond * 1000
    );
  };
};

export default notificationSlice.reducer;
