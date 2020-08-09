import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import combineReducers from './reducers/index'

const initialState = {}

//Central redux store (store auth, blog, and alert sub-states)
const store = createStore(
  combineReducers, 
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store