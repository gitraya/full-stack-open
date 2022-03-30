import { useState } from "react";

const Header = ({ title }) => <h1>{title}</h1>;
const Button = ({ onClick, text }) => (
  <button type="button" onClick={onClick}>
    {text}
  </button>
);

const Anecdote = ({ title, anecdote, vote }) => (
  <>
    <Header title={title} />
    <p>{anecdote}</p>
    <p>{`has ${vote} vote${vote > 1 ? "s" : ""}`}</p>
  </>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [votes, setVotes] = useState(anecdotes.map(() => 0));
  const [selected, setSelected] = useState(0);

  const onNextAnecdoteHandler = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));
  const onVotedHandler = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const mostVotes = Math.max(...votes);
  const indexMostVotes = votes.indexOf(mostVotes);

  return (
    <div>
      <Anecdote
        title="Anecdote of the day"
        anecdote={anecdotes[selected]}
        vote={votes[selected]}
      />
      <Button text="vote" onClick={onVotedHandler} />
      <Button text="next anecdote" onClick={onNextAnecdoteHandler} />
      {mostVotes > 0 && (
        <Anecdote
          title="Anecdote with most votes"
          anecdote={anecdotes[indexMostVotes]}
          vote={votes[indexMostVotes]}
        />
      )}
    </div>
  );
};

export default App;
