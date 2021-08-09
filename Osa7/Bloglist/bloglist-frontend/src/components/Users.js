import React from 'react'
import { useSelector } from 'react-redux'

const Users = () => {
  //get all of the blogs in store
  const blogs = useSelector(state => state.blogs)
  //get users in blogs
  const users = blogs.map(blog => blog.user[0])
  //get unique users
  const uniqueUsers = [...new Map(users.map(user => [user.id, user])).values()]

  //create an array with objects consisting of username and amount of blogs
  const usersWithBlogs = new Array()
  uniqueUsers.map(user =>
    usersWithBlogs.push({
      username: user.username,
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

  const style = {
    padding: 8,
    textAlign: 'left',
    borderStyle: 'solid',
    borderWidth: 1
  }

  return (
    <div>
      <h2>Users</h2>
      <table style={{ borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <th style={style}>user</th>
            <th style={style}>blogs created</th>
          </tr>
          {usersWithBlogs.map(object =>
            <tr key={object.username}>
              <td style={style}>{object.username}</td>
              <td style={style}>{object.blogs}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users