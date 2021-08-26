import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [changeBirthyear] = useMutation(UPDATE_AUTHOR, {
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    },
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  const authors = result.loading ? [] : result.data.allAuthors

  /*
  after updating author, the next update on the same author 
  doesn't happen, but the one after that does, weird...
  */
  const submit = async (event) => {
    event.preventDefault()

    changeBirthyear({ variables: { name, setBornTo: year } })

    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      {result.loading
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
            {authors.map(author =>
              <tr key={author.id}>
                <td>{author.name}</td>
                <td>{author.born}</td>
                <td>{author.bookCount}</td>
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
                {authors.map(author =>
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