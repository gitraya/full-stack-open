import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    addNotification: (state, action) => action.payload,
    removeNotification: () => null,
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
