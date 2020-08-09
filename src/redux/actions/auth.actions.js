import * as types from '../constants/auth.constants'
import { alertActions } from "./alert.actions"
import api from '../api'

//Action include type and payload
//Middleware: receive parameters from UI -> process it -> send login action to reducer
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

//Middleware: receive parameters from UI -> process it -> send register action to reducer
const registerRequest = (name, email, password) => async (dispatch) => {
  dispatch({type: types.REGISTER_REQUEST, payload: null})

  try{
    let response = await api.post('/users', name, email, password)
    dispatch({type: types.REGISTER_REQUEST_SUCCESS, payload: response.data.data})
  }catch (error){
    dispatch({type: types.REGISTER_REQUEST_FAILURE, payload: error})
  }
}

//Middleware: receive parameters from UI -> process it -> send get-current-user action to reducer
const getCurrentUser = (accessToken) => async (dispatch) => {
  dispatch({ type: types.GET_CURRENT_USER_REQUEST, payload: null });
  if (accessToken) {
    console.log(accessToken)
    const bearerToken = "Bearer " + accessToken;
    api.defaults.headers.common["authorization"] = bearerToken;
  }
  try {
    const res = await api.get("/users/me");
    dispatch({ type: types.GET_CURRENT_USER_SUCCESS, payload: res.data});
  } catch (error) {
    dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: error });
  }
};

//Middleware: receive parameters from UI -> process it -> send logout action to reducer
const logout = () => (dispatch) => {
  delete api.defaults.headers.common["authorization"];
  localStorage.setItem("accessToken", "");
  dispatch({ type: types.LOGOUT, payload: null });
}

//Pack all actions into an object for exporting
export const authActions = {
  loginRequest,
  registerRequest,
  getCurrentUser,
  logout,
}