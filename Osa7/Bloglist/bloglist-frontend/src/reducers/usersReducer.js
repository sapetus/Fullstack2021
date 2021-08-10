import userServices from '../services/users'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT:USERS':
    return action.data
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userServices.getAll()
    dispatch({
      type: 'INIT:USERS',
      data: users
    })
  }
}

export default reducer