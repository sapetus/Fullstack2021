import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS_FILTER, ALL_BOOKS_NO_FILTER } from '../queries'

const Books = (props) => {
  const [filter, setFilter] = useState(null)
  const [genres, setGenres] = useState([])

  const [getAllBooks, { loading, data: allBooksData }] = useLazyQuery(ALL_BOOKS_NO_FILTER, {
    fetchPolicy: 'cache-and-network'
  })
  const [getBooksFilter, { data: filterBooksData }] = useLazyQuery(ALL_BOOKS_FILTER, {
    fetchPolicy: 'cache-and-network'
  })

  useEffect(() => {
    fetchAllBooks()
  }, [allBooksData]) //eslint-disable-line

  useEffect(() => {
    const bookGenres = loading ? [] : allBooksData?.allBooks?.map(book => book.genres)
    let tempArray = []
    if (!loading && allBooksData?.allBooks.length > 0) {
      bookGenres.forEach(genreArray => {
        genreArray.forEach(genre => {
          if (!tempArray.includes(genre)) {
            tempArray = tempArray.concat(genre)
          }
        })
      })
    }
    setGenres(tempArray)
  }, [allBooksData?.allBooks, loading])

  const fetchBooksByGenre = (genre) => {
    getBooksFilter({ variables: { genre: genre } })
    setFilter(genre)
  }
  const fetchAllBooks = () => {
    getAllBooks()
    setFilter(null)
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      {loading
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
              {filter === null
                ? allBooksData?.allBooks?.map(book =>
                  <tr key={book.title}>
                    <td>{book.title}</td>
                    <td>{book.author.name}</td>
                    <td>{book.published}</td>
                  </tr>
                )
                : filterBooksData?.allBooks?.map(book =>
                  <tr key={book.title}>
                    <td>{book.title}</td>
                    <td>{book.author.name}</td>
                    <td>{book.published}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
          {genres.map(genre =>
            <button key={genre} onClick={() => fetchBooksByGenre(genre)}>{genre}</button>
          )}
          <button onClick={() => fetchAllBooks()}>No Filter</button>
        </div>}
    </div>
  )
}

export default Books