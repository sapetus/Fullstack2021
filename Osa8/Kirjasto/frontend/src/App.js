import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import LoginForm from './components/LoginForm'
import Message from './components/Message'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  const setError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 6000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <Message
        errorMessage={errorMessage}
      />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token
          ? <button onClick={() => setPage('add')}>add book</button>
          : null}
        {token
          ? <button onClick={logout}>logout</button>
          : <button onClick={() => setPage('login')}>login</button>}
      </div>
      <Authors
        show={page === 'authors'}
        loggedIn={token ? true : false}
        setError={setError}
      />
      <Books
        show={page === 'books'}
      />
      <BookForm
        show={page === 'add'}
        setError={setError}
      />
      <LoginForm
        show={page === 'login'}
        setPage={setPage}
        setToken={setToken}
        setError={setError}
      />
    </div>
  )
}

export default App