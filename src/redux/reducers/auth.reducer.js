import * as types from '../constants/auth.constants'

//initialize global state for auth. This state must include every attribute that is used for this reducer
const initialState = {
  user: {},
  isAuthenticated: false,
  loading: false,
}

//Reducer: command central to update global state of auth
const authReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case types.LOGIN_REQUEST:
      return { ...state, loading: true }
    case types.LOGIN_REQUEST_SUCCESS:
      localStorage.setItem('accessToken', payload.accessToken)
      return { ...state, user: payload.data, isAuthenticated: true, loading: false }
    case types.LOGIN_REQUEST_FAILURE:
      return {...state, loading: false}
    case types.REGISTER_REQUEST:
      return {...state, loading: true}
    case types.REGISTER_REQUEST_SUCCESS:
      return {...state, loading: false, isAuthenticated: true}
    case types.REGISTER_REQUEST_FAILURE:
      return {...state, loading: false}
    case types.GET_CURRENT_USER_REQUEST:
      return {...state, loading: true}
    case types.GET_CURRENT_USER_SUCCESS:
      return {...state, loading: false, isAuthenticated: true, user: payload.data}
    case types.GET_CURRENT_USER_FAILURE:
      return {...state, loading: false}
    case types.LOGOUT:
      return {...state, accessToken: null, isAuthenticated: false, user: null, loading: false}
    default:
      return state
  }
}

export default authReducer