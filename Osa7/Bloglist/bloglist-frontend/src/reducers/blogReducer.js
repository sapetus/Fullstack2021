import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'VOTE': {
    const id = action.data.id
    const newState = state.filter(blog => blog.id !== id)
    return [...newState, action.data]
  }
  case 'CREATE':
    return [...state, action.data]
  case 'REMOVE': {
    const id = action.data.id
    const newState = state.filter(blog => blog.id === id)
    return newState
  }
  case 'INIT:BLOGS':
    return action.data
  default:
    return state
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE',
      data: id
    })
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT:BLOGS',
      data: blogs
    })
  }
}

export default reducer