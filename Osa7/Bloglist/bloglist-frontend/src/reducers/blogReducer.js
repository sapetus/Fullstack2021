import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'VOTE': {
    const id = action.data.id
    const newState = state.filter(blog => blog.id !== id)
    return [...newState, action.data.blog]
  }
  case 'CREATE:BLOG':
    return [...state, action.data]
  case 'REMOVE:BLOG': {
    const id = action.data
    const newState = state.filter(blog => blog.id !== id)
    return newState
  }
  case 'INIT:BLOGS':
    return action.data
  default:
    return state
  }
}

export const voteBlog = (blogObject, id) => {
  return async dispatch => {
    await blogService.update(blogObject, id)
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT:BLOGS',
      data: blogs
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE:BLOG',
      data: id
    })
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'CREATE:BLOG',
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