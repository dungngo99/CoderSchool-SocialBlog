import * as types from '../constants/auth.constants'

const initialState = {
  user: {},
  isAuthenticated: false,
  loading: false,
}

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
    case types.LOGOUT:
      return {...state, accessToken: null, isAuthenticated: false, user: null, loading: false}
    default:
      return state
  }
}

export default authReducer