import { useSelector, useDispatch } from "react-redux";
import { doVoteAnecdote } from "../reducers/anecdoteReducer";
import { addNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes
      .slice()
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes)
  );

  const vote = (anecdote) => {
    dispatch(doVoteAnecdote(anecdote.id));
    dispatch(addNotification(`you voted '${anecdote.content}'`));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
