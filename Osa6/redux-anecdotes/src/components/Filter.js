import React from 'react'
import { changeFilter } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    event.preventDefault()

    dispatch(changeFilter(event.target.value))
  }
  const style = {
    marginBottom: 10,
    paddingBottom: 10
  }

  return (
    <div style={style}>
      Filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter