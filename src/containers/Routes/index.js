import React from 'react'
import { Switch, Route } from 'react-router-dom'
import DashboardPage from '../DashboardPage/DashboardPage'
import PrivateRoute from './PrivateRoute'
import PageNotFound from './PageNotFound'
import PublicLayout from '../../layouts/PublicLayout'

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route path='/' component={PublicLayout}/>
        <PrivateRoute exact path='/dashboard' component={DashboardPage}></PrivateRoute>
        <Route path='*' component={PageNotFound}/>
      </Switch>
    </div>
  )
}
