import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeBlog, voteBlog } from '../reducers/blogReducer'
import { setMessage } from '../reducers/messageReducer'
import { useHistory } from 'react-router'

const Blog = ({ blog, comments }) => {
  if (!blog) {
    return null
  }

  const dispatch = useDispatch()

  const history = useHistory()
  const user = useSelector(state => state.user)

  const update = (event) => {
    event.preventDefault()
    const blogObject = { ...blog, likes: blog.likes + 1, user: blog.user[0].id }

    dispatch(voteBlog(blogObject, blog.id))
  }

  const remove = (event) => {
    event.preventDefault()

    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)

    if (confirm) {
      dispatch(removeBlog(blog.id))
      dispatch(setMessage('Blog has been deleted', 5))
      history.push('/')
    }
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a> <br />
      Likes: {blog.likes} <button className='like-button' onClick={update}>Like</button> <br />
      Added by {blog.user[0].name} <br />
      {user.username === blog.user[0].username
        ? <button className='delete-button' onClick={remove}>Delete</button>
        : null}
      <h2>Comments</h2>
      {comments.map(comment =>
        <li key={comment.id}>
          {comment.comment}
        </li>
      )}
    </div>
  )

}

export default Blog