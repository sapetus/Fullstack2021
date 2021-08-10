import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { createBlog, initializeBlogs } from '../reducers/blogReducer'
import { setMessage } from '../reducers/messageReducer'

const BlogForm = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const dispatch = useDispatch()

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      url: newUrl,
      author: newAuthor,
      title: newTitle
    }

    dispatch(createBlog(blogObject))
    dispatch(initializeBlogs())
    dispatch(setMessage('A new blog \'' + blogObject.title + '\' by ' + blogObject.author + ' has been added', 5))

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Add a new Blog</h2>
      <form id='blog-form' onSubmit={addBlog}>
        Title:
        <input
          id='title'
          type='text'
          value={newTitle}
          onChange={handleTitleChange}
        />
        <br />
        Author:
        <input
          id='author'
          type='text'
          value={newAuthor}
          onChange={handleAuthorChange}
        />
        <br />
        URL:
        <input
          id='url'
          type='text'
          value={newUrl}
          onChange={handleUrlChange}
        />
        <br />
        <button id='create-button' type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm