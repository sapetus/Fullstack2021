import React from 'react'
import Anecdotes from './components/Anecdotes'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdotes />
      <h2>create new</h2>
      <form id='create-form'>
        <div id='input'>
          <input />
        </div>
        <button id='create-button'>create</button>
      </form>
    </div>
  )
}

export default App