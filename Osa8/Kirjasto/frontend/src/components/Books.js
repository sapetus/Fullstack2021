import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS_NO_FILTER } from '../queries'

const Books = (props) => {
  const [filter, setFilter] = useState(null)

  const result = useQuery(ALL_BOOKS_NO_FILTER)

  if (!props.show) {
    return null
  }

  const books = result.loading ? [] : result.data.allBooks
  let filteredBooks = books
  if (filter && !result.loading) {
    filteredBooks = filteredBooks.filter(book => book.genres.includes(filter))
  }

  const bookGenres = result.loading ? [] : result.data.allBooks.map(book => book.genres)
  let genres = []
  if (!result.loading) {
    bookGenres.forEach(genreArray => {
      genreArray.forEach(genre => {
        if (!genres.includes(genre)) {
          genres.push(genre)
        }
      })
    })
  }

  return (
    <div>
      <h2>books</h2>

      {result.loading
        ? <div>loading...</div>
        : <div>
          {filter ? <p>In genre: <strong>{filter}</strong></p> : null}
          <table>
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
              {filteredBooks.map(a =>
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              )}
            </tbody>
          </table>
          {genres.map(genre =>
            <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>
          )}
          <button onClick={() => setFilter(null)}>No Filter</button>
        </div>}
    </div>
  )
}

export default Books