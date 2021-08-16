import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Message from './components/Message'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import Navigation from './components/Navigation'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { initializeComments } from './reducers/commentsReducer'

import { Container, createTheme, Typography } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto'
  }
})

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsers())
    dispatch(initializeComments())
  }, [dispatch])

  const currentUser = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  const comments = useSelector(state => state.comments)

  const userMatch = useRouteMatch('/users/:id')
  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null
  const filteredComments = blogMatch
    ? comments.filter(comment => comment.blog[0].id === blogMatch.params.id)
    : null

  //when the user is not logged in
  if (currentUser === null) {
    return (
      <div id='webpage'>
        <Typography variant='h2' component='h2'>Log In</Typography>
        <Message />
        <LoginForm />
      </div>
    )
  }

  //when the user is logged in
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <div id='webpage'>
          <Navigation />
          <Message />
          <Typography variant='h2' component='h2' gutterBottom>Blog App</Typography>
          <Switch>
            <Route path='/blogs/:id'>
              <Blog blog={blog} comments={filteredComments} />
            </Route>
            <Route path='/users/:id'>
              <User user={user} />
            </Route>
            <Route path='/users'>
              <Users />
            </Route>
            <Route path='/'>
              <Togglable buttonLabel='Create New Blog' ref={blogFormRef} >
                <BlogForm />
              </Togglable>
              <BlogList />
            </Route>
          </Switch>
        </div >
      </Container>
    </ThemeProvider>
  )
}

export default App