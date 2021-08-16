import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearUser } from '../reducers/userReducer'
import { AppBar, IconButton, Toolbar, Button, Grid } from '@material-ui/core'

const Navigation = () => {
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()

    dispatch(clearUser())

    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  return (
    <AppBar position='static' style={{ marginBottom: '1em' }}>
      <Toolbar>
        <IconButton edge='start' color='inherit' aria-label='menu' />
        <Button color='inherit' component={Link} to='/'>
          HOME
        </Button>
        <Button color='inherit' component={Link} to='/users'>
          USERS
        </Button>
        <Grid container justify='flex-end'>
          <Button color='inherit' onClick={handleLogout} justify='flex-end'>
            LOGOUT
          </Button>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation