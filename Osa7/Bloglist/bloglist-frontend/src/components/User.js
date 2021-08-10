import React from 'react'
import { useSelector } from 'react-redux'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  const blogs = useSelector(state => state.blogs)
  const filteredBlogs = blogs.filter(blog => {
    return blog.user[0].id === user.id
  })

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {filteredBlogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User