
import * as types from '../constants/alert.constants'

//Initialize global state (an array)
const initialState = []

//Reducer: a command center to update global state of alert
const alertReducer = (state=initialState, action) => {
  const {type, payload} = action

  switch(type){
    case types.SET_ALERT:
      return [...state, payload]
    case types.REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload)
    default:
      return state
  }
}

export default alertReducer