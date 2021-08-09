import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setMessage } from '../reducers/messageReducer'
import { setUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const loginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

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
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setMessage('Wrong username or password', 5))
    }
  }

  return (
    <form id='login-form' onSubmit={handleLogin} >
      <div>
        username
        <input
          id='username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type='submit'>login</button>
    </form >
  )
}

export default loginForm