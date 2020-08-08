import React, { useState } from 'react'
import {Redirect, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {authActions} from '../../redux/actions/auth.actions'
import {Container, Row, Col, Form, Button} from 'react-bootstrap'

const RegisterPage = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const loading = useSelector((state) => state.auth.loading)


  const [formData, setDataForm] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const handleChange = (event) => {
    setDataForm({...formData, [event.target.name]: event.target.value})
    setErrors({...errors, [event.target.name]: ''})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const {name, email, password, password2} = formData
    if (password !== password2){
      setErrors({...errors, password: 'Password does not match'})
      return;
    }
    dispatch(authActions.registerRequest({name, email, password}))
  }

  const fillFakeData = () => {
    setDataForm({
      name: "Minh",
      email: "minhdh@cs.vn",
      password: "123",
      password2: "123",
    });
  };

  if (isAuthenticated) return <Redirect to='/'></Redirect>

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div className="text-center mb-3">
            <h1 className="text-primary">Sign Up</h1>
            <p className="lead">
              <i className="fas fa-user" /> Create Your Account
            </p>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <small className="form-text text-danger">{errors.name}</small>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <small className="form-text text-danger">{errors.email}</small>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <small className="form-text text-danger">
                  {errors.password}
                </small>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
              />
            </Form.Group>
            {loading ? (
              <Button
                className="btn-block"
                variant="primary"
                type="button"
                disabled
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </Button>
            ) : (
                <Button className="btn-block" type="submit" variant="primary">
                  Register
                </Button>
              )}

            {/* TODO: remove fake data */}
            <Button
              className="btn-block"
              type="button"
              variant="light"
              onClick={fillFakeData}
            >
              Fill in fake data
            </Button>

            <p>
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default RegisterPage
