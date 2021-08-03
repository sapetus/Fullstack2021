import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import blogService from './services/blogs'
import loginService from './services/login'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Message from './components/Message'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'

import { setMessage } from './reducers/messageReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  //effect hook for getting blogs in db
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  //effect hook for checking if user is in storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setMessage('Wrong username or password', 5))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  //when the user is not logged in
  if (user === null) {
    return (
      <div>
        <h2>Log in</h2>
        <Message />
        <LoginForm
          username={username} setUsername={setUsername}
          password={password} setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  //when the user is logged in
  return (
    <div>
      <h2>Blog App</h2>
      <Message />
      <p>
        {user.username} has logged in
        <button onClick={handleLogout}>
          logout
        </button>
      </p>
      <Togglable
        buttonLabel='Create New Blog'
        ref={blogFormRef}
      >
        <BlogForm />
      </Togglable>
      <h2>Blogs</h2>
      <BlogList />
    </div>
  )
}

export default App