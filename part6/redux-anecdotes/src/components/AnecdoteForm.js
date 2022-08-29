import { connect } from "react-redux";
import { doAddAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = ({ doAddAnecdote, setNotification }) => {
  const onSubmit = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    doAddAnecdote(content);
    setNotification(`new anecdote '${content}`, 5);
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

const mapDispatchToProps = {
  doAddAnecdote,
  setNotification,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
