import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(createAnecdote(content))
    dispatch(setNotification(`You added '` + content + `'`, 5))
  }

  return (
    <div>
      <h2>Create new anecdote</h2>
      <form id='create-form' onSubmit={addAnecdote}>
        <div id='input'>
          <input name='anecdote' />
        </div>
        <button id='create-button' type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm