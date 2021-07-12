import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

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

    createBlog(blogObject)

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Add a new Blog</h2>
      <form onSubmit={addBlog}>
        Title:
        <input
          type='text'
          value={newTitle}
          onChange={handleTitleChange}
        />
        <br />
        Author:
        <input
          type='text'
          value={newAuthor}
          onChange={handleAuthorChange}
        />
        <br />
        URL:
        <input
          type='text'
          value={newUrl}
          onChange={handleUrlChange}
        />
        <br />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm