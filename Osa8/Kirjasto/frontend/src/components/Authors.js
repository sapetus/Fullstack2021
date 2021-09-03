import React, { useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [authors, setAuthors] = useState([])

  const [changeBirthyear, { loading: mutationLoading }] = useMutation(UPDATE_AUTHOR, {
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    },
    refetchQueries: [ALL_AUTHORS, 'allAuthors']
  })

  const [getAuthors, { loading: authorsLoading, data: authorsData }] = useLazyQuery(ALL_AUTHORS, {
    fetchPolicy: 'cache-and-network'
  })

  useEffect(() => {
    getAuthors()
  }, [authorsData, mutationLoading]) //eslint-disable-line

  useEffect(() => {
    const authors = authorsLoading ? [] : authorsData?.allAuthors
    setAuthors(authors)
  }, [authorsData?.allAuthors, authorsLoading, mutationLoading]) //eslint-disable-line

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    changeBirthyear({ variables: { name, setBornTo: year } })

    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      {authorsLoading
        ? <div>loading...</div>
        : <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                born
              </th>
              <th>
                books
              </th>
            </tr>
            {authors?.map(author =>
              <tr key={author.id}>
                <td>{author.name}</td>
                <td>{author.born}</td>
                <td>{author.books.length}</td>
              </tr>
            )}
          </tbody>
        </table>}
      {props.loggedIn
        ? <div>
          <h2>Set Birthyear</h2>
          <form onSubmit={submit}>
            <div>
              name
              <select onChange={({ target }) => setName(target.value)}>
                {authors?.map(author =>
                  <option key={author.id} value={author.name}>{author.name}</option>
                )}
              </select>
            </div>
            <div>
              born
              <input
                type='number'
                value={year}
                onChange={({ target }) => setYear(parseInt(target.value))}
              />
            </div>
            <button type='submit'>Update Author</button>
          </form>
        </div>
        : null
      }
    </div>
  )
}

export default Authors