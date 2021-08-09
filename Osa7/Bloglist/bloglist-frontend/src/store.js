import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import messageReducer from './reducers/messageReducer'
import blogReducer from './reducers/blogReducer'
import useReducer from './reducers/userReducer'

const reducer = combineReducers({
  message: messageReducer,
  blogs: blogReducer,
  user: useReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store