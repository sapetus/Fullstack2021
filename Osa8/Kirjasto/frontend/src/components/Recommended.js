import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ME, ALL_BOOKS_FILTER } from '../queries'

const Recommended = ({ show, loggedIn }) => {
  const [getUser, { data: dataUser }] = useLazyQuery(ME, {
    fetchPolicy: 'cache-and-network'
  })
  const [getBooks, { data: dataBooks }] = useLazyQuery(ALL_BOOKS_FILTER, {
    fetchPolicy: 'cache-and-network'
  })

  useEffect(() => {
    if (loggedIn) {
      getUser()
    }
  }, [loggedIn, getUser])

  useEffect(() => {
    if (dataUser?.me) {
      getBooks({ variables: { genre: dataUser.me.favouriteGenre } })
    }
  }, [dataUser, getBooks])

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>Recommendations</h2>
      {dataUser?.me?.favouriteGenre
        ? <p>books in your favourite genre <strong>{dataUser.me.favouriteGenre}</strong></p>
        : null
      }
      {dataBooks?.allBooks
        ? <div>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {dataBooks.allBooks.map(book =>
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        : null
      }
    </div>
  )
}

export default Recommended