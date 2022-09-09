import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
  },
});

export const { setUser } = userSlice.actions;

export const initializeLoginUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      const decodedJwt = JSON.parse(atob(user.token.split(".")[1]));

      if (decodedJwt.exp * 1000 < Date.now()) {
        dispatch(logoutUser());
      } else {
        dispatch(setUser(user));
        blogService.setToken(user.token);
      }
    }
  };
};

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password,
    });

    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch(setUser(user));
    return user;
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(setUser(null));
  };
};

export default userSlice.reducer;
