const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);

  let newState = state;

  switch (action.type) {
    case "VOTE":
      newState = state.map((anecdote) => ({
        ...anecdote,
        votes: anecdote.votes + (anecdote.id === action.id ? 1 : 0),
      }));
      break;
    case "NEW_ANECDOTE":
      newState = [...state, asObject(action.anecdote)];
      break;
    default:
      break;
  }

  return newState.sort((a, b) => b.votes - a.votes);
};

export const doVoteAnecdote = (id) => ({ type: "VOTE", id });

export const doAddAnecdote = (anecdote) => ({
  type: "NEW_ANECDOTE",
  anecdote,
});

export default reducer;
