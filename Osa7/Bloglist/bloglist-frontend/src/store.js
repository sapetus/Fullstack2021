import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import messageReducer from './reducers/messageReducer'
import blogReducer from './reducers/blogReducer'
import usersReducer from './reducers/usersReducer'
import useReducer from './reducers/userReducer'
import commentsReducer from './reducers/commentsReducer'

const reducer = combineReducers({
  message: messageReducer,
  blogs: blogReducer,
  user: useReducer,
  users: usersReducer,
  comments: commentsReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store