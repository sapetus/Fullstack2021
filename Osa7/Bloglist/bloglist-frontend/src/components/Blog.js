import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeBlog, voteBlog } from '../reducers/blogReducer'
import { setMessage } from '../reducers/messageReducer'
import { useHistory } from 'react-router'
import CommentForm from './CommentForm'
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Typography
} from '@material-ui/core'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'

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
      <Typography variant='h4' component='h4'>{blog.title} by {blog.author}</Typography>
      {user.username === blog.user[0].username
        ? <Button variant='contained' color='secondary' onClick={remove}>Delete</Button>
        : null}
      <Table style={{ marginBottom: '1em' }}>
        <TableBody>
          <TableRow>
            <TableCell>
              ADDRESS
            </TableCell>
            <TableCell>
              <a href={blog.url}>{blog.url}</a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              LIKES
            </TableCell>
            <TableCell>
              {blog.likes} &nbsp;
              <Button variant='contained' color='primary' onClick={update}>
                LIKE
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              ADDED BY
            </TableCell>
            <TableCell>
              {blog.user[0].name}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Typography variant='h4' component='h4'>Comments</Typography>
      <CommentForm blogId={blog.id} />
      <List component='nav'>
        {comments.map(comment =>
          <ListItem key={comment.id}>
            <ListItemIcon>
              <ArrowRightIcon />
            </ListItemIcon>
            <ListItemText primary={comment.comment} />
          </ListItem>
        )}
      </List>
    </div>
  )

}

export default Blog