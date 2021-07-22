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

export const changeNotification = (notification) => {
  return {
    type: 'CHANGE:NOTIFICATION',
    data: notification
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE'
  }
}

export default reducer