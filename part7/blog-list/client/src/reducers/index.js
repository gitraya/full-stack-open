import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blog";
import notificationReducer from "./notification";
import userReducer from "./user";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    user: userReducer,
  },
});

export default store;
