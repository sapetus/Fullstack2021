import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  const dispatch = useDispatch()

  const onVote = () => {
    handleClick()
    dispatch(setNotification(`You voted '` + anecdote.content + `'`, 5))
  }

  return (
    <div className='anecdote'>
      <div className='content'>
        {anecdote.content}
      </div>
      <div className='votes'>
        has {anecdote.votes}
        <button className='vote-button' onClick={() => onVote()}>
          vote
        </button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const orderedAnecdotes = anecdotes.sort(
    (a, b) => (a.votes > b.votes) ? -1 : 1
  )

  const filteredAndOrderedAnecdotes = orderedAnecdotes.filter(anecdote =>
    anecdote
      .content
      .toLowerCase()
      .includes(filter.toLowerCase())
  )

  return (
    <div>
      <ul>
        {filteredAndOrderedAnecdotes.map(anecdote =>
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