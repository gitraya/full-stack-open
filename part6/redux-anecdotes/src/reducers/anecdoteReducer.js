import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes: (state, action) => action.payload,
  },
});

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const doAddAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const doVoteAnecdote = (id) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.get(id);
    await anecdoteService.edit(id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    });

    initializeAnecdotes()(dispatch);
  };
};

export default anecdoteSlice.reducer;
