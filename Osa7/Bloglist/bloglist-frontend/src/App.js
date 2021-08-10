import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch, Route,
  Link, useRouteMatch
} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Message from './components/Message'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, clearUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

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

  //effect hook for getting users from storage
  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const currentUser = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  const match = useRouteMatch('/users/:id')
  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

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
  if (currentUser === null) {
    return (
      <div id='webpage'>
        <h2>Log in</h2>
        <Message />
        <LoginForm />
      </div>
    )
  }

  //when the user is logged in
  return (
    <div id='webpage'>
      <div id='navbar'>
        <Link style={style} to='/'>HOME</Link>
        <Link style={style} to='/users'>USERS</Link>
      </div>

      <h2>Blog App</h2>

      <Message />

      <div id='user'>
        <p>
          {currentUser.username} has logged in <br />
          <button onClick={handleLogout}>
            logout
          </button>
        </p>
      </div>

      <Switch>
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
          <h2>Blogs</h2>
          <BlogList />
        </Route>
      </Switch>
    </div>
  )
}

export default App