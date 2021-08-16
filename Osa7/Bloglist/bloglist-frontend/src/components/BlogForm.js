import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { createBlog, initializeBlogs } from '../reducers/blogReducer'
import { setMessage } from '../reducers/messageReducer'

import {
  TextField,
  Button,
  Typography
} from '@material-ui/core'

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
    dispatch(setMessage('A new blog \'' + blogObject.title + '\' by ' + blogObject.author + ' has been added', 5))
    dispatch(initializeBlogs())

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <Typography variant='h4' component='h4'>Add a New Blog</Typography>
      <form id='blog-form' onSubmit={addBlog}>
        <div>
          <TextField label='Title' onChange={handleTitleChange} value={newTitle} />
        </div>
        <div>
          <TextField label='Author' onChange={handleAuthorChange} value={newAuthor}/>
        </div>
        <div>
          <TextField label='URL' onChange={handleUrlChange} value={newUrl}/>
        </div>
        <Button variant='contained' color='primary' type='submit'>
          Create
        </Button>
      </form>
    </div>
  )
}

export default BlogForm