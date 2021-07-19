import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id} className='anecdote'>
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

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  return (
    <ul>
      {anecdotes.map(anecdote =>
      <Anecdote
        anecdote={anecdote}
        handleClick={() => 
          dispatch(voteAnecdote(anecdote.id))
        }
      />
      )}
    </ul>
  )
}

export default Anecdotes