import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  const authors = result.loading ? [] : result.data.allAuthors

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
              <tr key={author.name}>
                <td>{author.name}</td>
                <td>{author.born}</td>
                <td>{author.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>}
    </div>
  )
}

export default Authors