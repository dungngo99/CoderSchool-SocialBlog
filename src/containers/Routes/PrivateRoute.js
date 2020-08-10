import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'

//PrivateRoute component to protect authenticated page
export default function PrivateRoute({path, component}) {
  //Get the global state "authentication" from redux store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  //If user is authenticated, it can accces a page with rest.component
  if (isAuthenticated) return <Route exact path={path} component={component}></Route>

  //Otherwise, redirect to login page for authentication
  return <Route exact path={path} render={() => <Redirect to={'/login'}></Redirect>}></Route>
}
