const reducer = (state = null, action) => {
  switch (action.type) {
    case 'CHANGE:NOTIFICATION':
      return action.data
    case 'HIDE':
      return null
    default:
      return state
  }
}

export const setNotification = (notification, delay) => {
  return async dispatch => {
    dispatch({
      type: 'CHANGE:NOTIFICATION',
      data: notification
    })

    setTimeout(() => dispatch({
      type: 'HIDE'
    }), delay * 1000)
  }
}

export default reducer