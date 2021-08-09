import blogService from '../services/blogs'

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'SET:USER':
    return action.data
  case 'INIT:USER':
    return action.data
  case 'CLEAR:USER':
    return null
  default:
    return state
  }
}

export const clearUser = () => {
  return async dispatch => {
    dispatch({
      action: 'CLEAR:USER'
    })
  }
}

export const initializeUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)

    return async dispatch => {
      dispatch({
        type: 'INIT:USER',
        data: user
      })
    }
  } else {
    return async dispatch => {
      dispatch({
        type: 'DEFAULT'
      })
    }
  }
}

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET:USER',
      data: user
    })
  }
}

export default reducer