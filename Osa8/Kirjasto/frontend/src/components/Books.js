import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS_NO_FILTER } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS_NO_FILTER)

  if (!props.show) {
    return null
  }

  const books = result.loading ? [] : result.data.allBooks

  return (
    <div>
      <h2>books</h2>

      {result.loading
        ? <div>loading...</div>
        : <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
              </th>
              <th>
                published
              </th>
            </tr>
            {books.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>}
    </div>
  )
}

export default Books