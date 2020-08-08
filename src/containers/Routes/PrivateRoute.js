import React from 'react'
import {Route, Redirect} from 'react-router-dom'

export default function PrivateRoute({isAuthenticated, ...rest}) {
  if (isAuthenticated) return <Route {...rest}></Route>
  delete rest.component
  return <Route {...rest} render={() => <Redirect to={'/login'}></Redirect>}></Route>
}
