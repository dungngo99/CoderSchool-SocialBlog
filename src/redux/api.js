import axios from 'axios'
import store from "./store";
import { alertActions } from "./actions/alert.actions";

const api = axios.create({
  baseURL: 'https://social-api-cs.great.dev/',
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(
  (request) => {
    console.log('Starting request', request)
    return request
  },
  function (error){
    console.log('Request error', error)
    store.dispatch(alertActions.setAlert(error.message, "danger"));
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    console.log('Response:', response)
    return response
  },
  function (error){
    error = error.response.data
    console.log('Response error', error)
    store.dispatch(alertActions.setAlert(error.message, "danger"));
    return Promise.reject(error)
  }
)

export default api