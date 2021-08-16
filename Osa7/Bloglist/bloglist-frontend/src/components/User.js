import React from 'react'
import { useSelector } from 'react-redux'
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography
} from '@material-ui/core'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import { Link } from 'react-router-dom'

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
      <Typography variant='h4' component='h4' gutterBottom>{user.username}</Typography>
      <Typography variant='h6' componrnt='h6'>Added Blogs</Typography>
      <List component='nav'>
        {filteredBlogs.map(blog => (
          <ListItem key={blog.id}>
            <ListItemIcon>
              <ArrowRightIcon />
            </ListItemIcon>
            <Link to={`/blogs/${blog.id}`}>
              <ListItemText primary={blog.title} />
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default User