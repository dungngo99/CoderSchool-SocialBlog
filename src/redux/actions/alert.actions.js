import { v4 as uuidv4 } from "uuid";
import * as types from "../constants/alert.constants";

//Middleware: receive parameters from UI -> process it -> send action to redux reducer
const setAlert = (msg, alertType, timeout=5000) => (dispatch) => {
  const id = uuidv4();
  
  dispatch({
    type: types.SET_ALERT,
    payload: {msg, alertType, id}
  })

  setTimeout(() => dispatch({type: types.REMOVE_ALERT, payload: id}), timeout)
}

//Pack all actions into an object for exporting
export const alertActions = {
  setAlert,
}