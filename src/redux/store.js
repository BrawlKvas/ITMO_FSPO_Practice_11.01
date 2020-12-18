import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './authReducer'
import examReducer from './examReducer'

const store = createStore(
  combineReducers({
    auth: authReducer,
    exam: examReducer
  }),
  applyMiddleware(thunk)
)

export default store