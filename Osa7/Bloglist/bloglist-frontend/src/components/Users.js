import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Users = () => {
  //get all of the blogs in store
  const blogs = useSelector(state => state.blogs)
  //get users
  const uniqueUsers = useSelector(state => state.users)

  //create an array with objects consisting of username and amount of blogs
  const usersWithBlogs = new Array()
  uniqueUsers.map(user =>
    usersWithBlogs.push({
      username: user.username,
      id: user.id,
      blogs: 0
    })
  )

  //go through the users and blogs and increment the values of the array above when user matches the user in the blog
  uniqueUsers.forEach(user => {
    blogs.forEach(blog => {
      if (user.username === blog.user[0].username) {
        usersWithBlogs.forEach(object => {
          if (object.username === user.username) {
            object.blogs += 1
          }
        })
      }
    })
  })

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>user</th>
            <th>blogs created</th>
          </tr>
          {usersWithBlogs.map(object =>
            <tr key={object.id}>
              <td >
                <Link to={`/users/${object.id}`}>
                  {object.username}
                </Link>
              </td>
              <td>{object.blogs}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users