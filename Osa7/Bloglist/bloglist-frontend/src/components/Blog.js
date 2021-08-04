import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { removeBlog, voteBlog } from '../reducers/blogReducer'
import { setMessage } from '../reducers/messageReducer'

const Blog = ({ blog, username }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const handleClick = () => {
    setVisible(!visible)
  }

  const update = (event) => {
    event.preventDefault()
    const blogObject = { ...blog, likes: blog.likes + 1, user: blog.user[0].id }

    dispatch(voteBlog(blogObject, blog.id))
  }

  //currently, this only works for the blog user created in that ?session?
  //if blog is liked, or user refreshes the page, the blog cannot be deleted by the user anymore
  //but the function itself works fine, problem is in the implementation of the user storage
  const remove = (event) => {
    event.preventDefault()

    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)

    if (confirm) {
      dispatch(removeBlog(blog.id))
      dispatch(setMessage('Blog has been deleted', 5))
    }
  }

  if (!visible) {
    return (
      <div className='blog'>
        {blog.title}, {blog.author}
        &nbsp;
        <button className='show-button' onClick={handleClick}>View</button>
      </div>
    )
  }

  if (visible) {
    //if user logged in matches the user who posted the blog, show delete button
    if (username === blog.user[0].username) {
      return (
        <div className='blog'>
          Title: {blog.title} <br />
          Author: {blog.author} <br />
          URL: {blog.url} <br />
          Likes: {blog.likes} <button className='like-button' onClick={update}>Like</button> <br />
          User: {blog.user[0].name} <br />
          <button className='hide-button' onClick={handleClick}>Hide</button>
          <button className='delete-button' onClick={remove}>Delete</button>
        </div>
      )
    }
    //else dont show the delete button
    return (
      <div className='blog'>
        Title: {blog.title} <br />
        Author: {blog.author} <br />
        URL: {blog.url} <br />
        Likes: {blog.likes} <button className='like-button' onClick={update}>Like</button> <br />
        User: {blog.user[0].name} <br />
        <button className='hide-button' onClick={handleClick}>Hide</button>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog