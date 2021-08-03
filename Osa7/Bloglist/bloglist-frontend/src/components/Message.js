import React from 'react'
import { useSelector } from 'react-redux'

const Message = () => {
  const message = useSelector(state => state.message)
  const style = {
    color: 'black',
    backgroundColor: 'darkgrey',
    fontSize: 25,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  return (
    <p id='message' style={style}>
      {message}
    </p>
  )
}

export default Message