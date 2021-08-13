import { createStore, combineReducers } from 'redux'
import noteReducer from './reducers/noteReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers( {notes: noteReducer, blogs: blogReducer, users: userReducer})

const store = createStore(reducer, composeWithDevTools())

export default store