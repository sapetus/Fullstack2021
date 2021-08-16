import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setMessage } from '../reducers/messageReducer'
import { setUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

import {
  TextField,
  Button
} from '@material-ui/core'

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
        <TextField type='text' label='username' value={username} onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        <TextField type='password' label='password' value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <Button variant='contained' color='primary' type='submit'>Login</Button>
    </form >
  )
}

export default loginForm