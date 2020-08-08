import * as types from '../constants/auth.constants'
import { alertActions } from "./alert.actions"
import api from '../api'

const loginRequest = (email, password) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST, payload: null})

  try{
    let response = await api.post('/auth/login', email, password)
    dispatch({type: types.LOGIN_REQUEST_SUCCESS, payload: response.data})

    const name = response.data.data.name;
    dispatch(alertActions.setAlert(`Welcome back, ${name}`, "success"));
  }catch(error){
    dispatch({type: types.LOGIN_REQUEST_FAILURE, payload: error})
  }
}

const registerRequest = (name, email, password) => async (dispatch) => {
  dispatch({type: types.REGISTER_REQUEST, payload: null})

  try{
    let response = await api.post('/users', name, email, password)
    dispatch({type: types.REGISTER_REQUEST_SUCCESS, payload: response.data.data})
  }catch (error){
    dispatch({type: types.REGISTER_REQUEST_FAILURE, payload: error})
  }
}

const getCurrentUser = (accessToken) => async (dispatch) => {
  dispatch({ type: types.GET_CURRENT_USER_REQUEST, payload: null });
  if (accessToken) {
    const bearerToken = "Bearer " + accessToken;
    api.defaults.headers.common["authorization"] = bearerToken;
  }
  try {
    const res = await api.get("/users/me");
    dispatch({ type: types.GET_CURRENT_USER_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: error });
  }
};

const logout = () => (dispatch) => {
  delete api.defaults.headers.common["authorization"];
  localStorage.setItem("accessToken", "");
  dispatch({ type: types.LOGOUT, payload: null });
}

export const authActions = {
  loginRequest,
  registerRequest,
  getCurrentUser,
  logout,
}