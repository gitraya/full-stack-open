import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs: (state, action) => action.payload,
  },
});

export const { appendBlog, setBlogs } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = ({ title, author, url }) => {
  return async (dispatch) => {
    const newBlog = await blogService.create({ title, author, url });
    dispatch(appendBlog(newBlog));
  };
};

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    const updatedBlog = await blogService.updateLike(id);
    const currentBlogs = getState().blogs;
    dispatch(
      setBlogs(currentBlogs.map((b) => (b.id === id ? updatedBlog : b)))
    );
  };
};

export const removeBlog = (id) => {
  return async (dispatch, getState) => {
    await blogService.remove(id);
    const currentBlogs = getState().blogs;
    dispatch(setBlogs(currentBlogs.filter((b) => b.id !== id)));
  };
};

export default blogSlice.reducer;
