import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div className='anecdote'>
      <div className='content'>
        {anecdote.content}
      </div>
      <div className='votes'>
        has {anecdote.votes}
        <button className='vote-button' onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const orderedListOfAnecdotes = anecdotes.sort(
    (a, b) => (a.votes > b.votes) ? -1 : 1
  )

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {orderedListOfAnecdotes.map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() =>
              dispatch(voteAnecdote(anecdote.id))
            }
          />
        )}
      </ul>
    </div>
  )
}

export default AnecdoteList