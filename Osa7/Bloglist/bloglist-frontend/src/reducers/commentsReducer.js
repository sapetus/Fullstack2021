import blogServices from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INITIALIZE:COMMENTS':
    return action.data
  case 'CREATE:COMMENT':
    return [...state, action.data]
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

export const createComment = (id, commentObject) => {
  return async dispatch => {
    const newComment = await blogServices.createComment(id, commentObject)
    dispatch({
      type: 'CREATE:COMMENT',
      data: newComment
    })
  }
}

export default reducer