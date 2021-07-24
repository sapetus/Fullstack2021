import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { changeNotification, hideNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    const newAnecdote = await anecdoteService.createNew(content)

    dispatch(createAnecdote(newAnecdote))
    dispatch(changeNotification(`You added '` + content + `'`))
    
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
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