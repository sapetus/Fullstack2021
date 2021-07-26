import React, { useEffect } from 'react'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

import AnecdoteList from './components/AnecdoteList'

// these do the same thing, but the components
// ending in 'Connect' use  connect function instead of hooks
import Notification from './components/Notification'
import NotificationConnect from './components/NotificationConnect'
import Filter from './components/Filter'
import FilterConnect from './components/FilterConnect'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteFormConnect from './components/AnecdoteFormConnect'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <NotificationConnect />
      <h1>Anecdotes</h1>
      <FilterConnect />
      <AnecdoteList />
      <AnecdoteFormConnect />
    </div>
  )
}

export default App