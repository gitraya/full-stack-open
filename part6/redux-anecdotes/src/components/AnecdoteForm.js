import { useDispatch } from "react-redux";
import { doAddAnecdote } from "../reducers/anecdoteReducer";
import { addNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    const newAnecdote = event.target.anecdote.value;
    dispatch(doAddAnecdote(newAnecdote));
    dispatch(addNotification(`you create a new anecdote '${newAnecdote}`));
    event.target.anecdote.value = "";
  };

  return (
    <>
      <h2>
        <label htmlFor="anecdote">create new</label>
      </h2>
      <form onSubmit={onSubmit}>
        <div>
          <input id="anecdote" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
