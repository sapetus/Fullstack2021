import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Message from './components/Message'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import Users from './components/Users'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, clearUser } from './reducers/userReducer'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  //effect hook for getting blogs in db
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  //effect hook for getting user from storage
  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  const user = useSelector(state => state.user)

  const handleLogout = (event) => {
    event.preventDefault()

    dispatch(clearUser())

    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  const style = {
    padding: 5
  }

  //when the user is not logged in
  if (user === null) {
    return (
      <div>
        <h2>Log in</h2>
        <Message />
        <LoginForm />
      </div>
    )
  }

  //when the user is logged in
  return (
    <Router>
      <div>
        <Link style={style} to='/'>HOME</Link>
        <Link style={style} to='/users'>USERS</Link>
      </div>

      <Switch>

        <Route path='/users'>
          <h2>Blog App</h2>
          <Message />
          <p>
            {user.username} has logged in <br />
            <button onClick={handleLogout}>
              logout
            </button>
          </p>
          <Users />
        </Route>

        <Route path='/'>
          <div>
            <h2>Blog App</h2>
            <Message />
            <p>
              {user.username} has logged in <br />
              <button onClick={handleLogout}>
                logout
              </button>
            </p>
            <Togglable buttonLabel='Create New Blog' ref={blogFormRef} >
              <BlogForm />
            </Togglable>
            <h2>Blogs</h2>
            <BlogList />
          </div>
        </Route>
      </Switch>
    </Router>
  )
}

export default App