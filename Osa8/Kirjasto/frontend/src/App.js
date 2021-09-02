import React, { useState } from 'react'
import { useApolloClient, gql, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import LoginForm from './components/LoginForm'
import Message from './components/Message'
import Recommended from './components/Recommended'
import { ALL_BOOKS_NO_FILTER, BOOK_DETAILS } from './queries'

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
      setError(`${addedBook.title} added`)
    }
  })

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(book => book.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS_NO_FILTER })

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS_NO_FILTER,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

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
    setPage("authors")
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
          ? <button onClick={() => setPage('recommended')}>recommended</button>
          : null
        }
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
        updateCacheWith={updateCacheWith}
      />
      <LoginForm
        show={page === 'login'}
        setPage={setPage}
        setToken={setToken}
        setError={setError}
      />
      <Recommended
        show={page === 'recommended'}
        loggedIn={token ? true : false}
      />
    </div>
  )
}

export default App