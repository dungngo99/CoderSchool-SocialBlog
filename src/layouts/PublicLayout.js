import React from 'react'
import { Container } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from '../containers/Routes/PrivateRoute'

import PublicNavbar from '../containers/PublicNavbar/PublicNavbar'
import RegisterPage from '../containers/RegisterPage/RegisterPage'
import LoginPage from '../containers/LoginPage/LoginPage'
import HomePage from '../containers/HomePage/HomePage'
import BlogDetailPage from '../containers/BlogDetailPage/BlogDetailPage'
import AddEditBlogPage from '../containers/AddEditBlogPage/AddEditBlogPage'
import AlertMsg from './Alert'

const PublicLayout = () => {
  return (
    <div>
      <PublicNavbar />
      <Container>
        <AlertMsg/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/blogs/:id" component={BlogDetailPage} />
          <PrivateRoute exact path="/blog/add" component={AddEditBlogPage} />
          <PrivateRoute exact path="/blog/edit/:id" component={AddEditBlogPage} />
        </Switch>
      </Container>
    </div>
  )
}

export default PublicLayout
