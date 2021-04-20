import React, {useState} from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  );
};

function App() {
  const anecdotes = [
    'The best way to get a project done faster is to start sooner',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Even the best planning is not so omniscient as to get it right the first time.',
    'The bearing of a child takes nine months, no matter how many women are assigned. Many software tasks have this characteristic because of the sequential nature of debugging.',
    'Perfection (in design) is achieved not when there is nothing more to add, but rather when there is nothing more to take away',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ];

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0);
  const [mostVotesIndex, setmostVotesIndex] = useState(0);

  const randomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };
  const addVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
    if (copy[selected] > copy[mostVotesIndex]) {
      setmostVotesIndex(selected);
    };
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      
      <Button handleClick={() => addVote()} text='vote'/>
      <Button handleClick={() => randomAnecdote()} text='next'/>

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotesIndex]}</p>
    </div>
  );
};

export default App;