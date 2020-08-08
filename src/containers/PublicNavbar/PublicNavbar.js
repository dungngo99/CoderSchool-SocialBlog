import React from 'react'
import {Nav, Navbar} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {authActions} from '../../redux/actions/auth.actions'

const PublicNavbar = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const loading = useSelector((state) => state.auth.loading)

  const handleLogout = (event) => {
    //Handle logout event here
    console.log(event)
    dispatch(authActions.logout())
  }

  const authLink = (
    <Nav>
      <Nav.Link as={Link} to='/dashboard'>
        <i className="fas fa-chart-line" /> Dashboard
      </Nav.Link>
      <Nav.Link as={Link} onClick={(event) => handleLogout(event)}>
        <i className="fas fa-sign-out-alt" /> Logout
      </Nav.Link>
    </Nav>
  )

  const publicLink = (
    <Nav>
      <Nav.Link as={Link} to='/register'>
        <i className="fas fa-registered" /> Register
      </Nav.Link>
      <Nav.Link as={Link} to='/login'>
        <i className="fas fa-sign-in-alt" /> Login
      </Nav.Link>
    </Nav>
  )

  return (
    <Navbar bg='light' expand='lg'>
      <Navbar.Brand as={Link} to="/" className="mr-auto">
        <img src={''} alt="CoderSchool" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className='mr-auto'></Nav>
        {!loading && <>{isAuthenticated ? authLink : publicLink}</>}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default PublicNavbar
