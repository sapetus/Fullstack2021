let timeoutID = 0;

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
  clearTimeout(timeoutID)

  return async dispatch => {
    dispatch({
      type: 'CHANGE:NOTIFICATION',
      data: notification
    })

    timeoutID = setTimeout(() => dispatch({
      type: 'HIDE'
    }), delay * 1000)
  }
}

export default reducer