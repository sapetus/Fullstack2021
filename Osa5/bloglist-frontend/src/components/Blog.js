import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog, username }) => {
  const [visible, setVisible] = useState(false)

  const handleClick = () => {
    setVisible(!visible)
  }

  const update = (event) => {
    event.preventDefault()

    const blogObject = {
      user: blog.user[0].id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    updateBlog(blogObject, blog.id)
  }

  const remove = (event) => {
    event.preventDefault()

    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)

    if (confirm) {
      removeBlog(blog.id)
    }
  }

  if (!visible) {
    return (
      <div className='blog-field'>
        <p>
          {blog.title}, {blog.author}
          &nbsp;
          <button onClick={handleClick}>View</button>
        </p>
      </div>
    )
  }

  if (visible) {
    //if user logged in matches the user who posted the blog, show delete button
    if (username === blog.user[0].username) {
      return (
        <div className='blog-field'>
          Title: {blog.title} <br />
          Author: {blog.author} <br />
          URL: {blog.url} <br />
          Likes: {blog.likes} <button onClick={update}>Like</button> <br />
          User: {blog.user[0].name} <br />
          <button onClick={handleClick}>Hide</button>
          <button onClick={remove}>Delete</button>
        </div>
      )
    }
    //else dont show the delete button
    return (
      <div className='blog-field'>
        Title: {blog.title} <br />
        Author: {blog.author} <br />
        URL: {blog.url} <br />
        Likes: {blog.likes} <button onClick={update}>Like</button> <br />
        User: {blog.user[0].name} <br />
        <button onClick={handleClick}>Hide</button>
      </div>
    )
  }
}

export default Blog