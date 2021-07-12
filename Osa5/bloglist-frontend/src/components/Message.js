import React from 'react'

const Message = ({ message, style }) => {
  if (message === null) {
    return null
  }

  return (
    <p className='message' style={style}>
      {message}
    </p>
  )
}

export default Message