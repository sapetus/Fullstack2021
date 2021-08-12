import blogServices from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INITIALIZE:COMMENTS':
    return action.data
  default:
    return state
  }
}

export const initializeComments = (id) => {
  return async dispatch => {
    const comments = await blogServices.getComments(id)
    dispatch({
      type: 'INITIALIZE:COMMENTS',
      data: comments
    })
  }
}

export default reducer