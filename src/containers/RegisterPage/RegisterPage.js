import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/actions/auth.actions";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

//RegisterPage component
const RegisterPage = () => {
  //Dispatch to send action to redux reducer
  const dispatch = useDispatch()

  //Get the global state from redux store (with auth as attribute)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const loading = useSelector((state) => state.auth.loading)

  //local state: store user's input
  const [formData, setDataForm] = useState({
    name: '', 
    email: '',
    password: '',
    password2: '',
  })

  //local state: store user's error
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  //Function to update values when user is typing
  const handleChange = (event) => {
    setDataForm({ ...formData, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" });
  };

  //Function to call Middleware and then send action to redux reducer
  const handleSubmit = (event) => {
    //Prevent the page from reloading
    event.preventDefault()

    //Get the user's inputs (Quick object assignment)
    const {name, email, password, password2} = formData

    //Check if passwords are all the same
    if (password !== password2){
      setErrors({...errors, password: 'Password does not match'})
      return;
    }
    if (!password){
      setErrors({...errors, password: 'Fill out password'})
      return;
    }
    if (!email){
      setErrors({ ...errors, email: 'Fill out email' })
      return;
    }
    if (!name) {
      setErrors({ ...errors, name: 'Fill out name' })
      return;
    }
    if (!password2) {
      setErrors({ ...errors, password2: 'Fill out password' })
      return;
    }

    //Call Middleware and then call redux reducer
    dispatch(authActions.registerRequest({name, email, password}))
  }

  //Fill in fake data for purpose of testing
  const fillFakeData = () => {
    setDataForm({
      name: "Minh",
      email: "minhdh@cs.vn",
      password: "123",
      password2: "123",
    });
  };

  //If the user has been authenticated, redirect to homepage
  if (isAuthenticated) return <Redirect to='/'></Redirect>

  return (
    <Container className="bg-resgister">
      <Row>
        <Col>
          <div className="text-center mb-3">
            <h1 className="text-primary" style={{ "font-size": "25px" }}>
              Sign Up
            </h1>
            <p className="lead">
              <i className="fas fa-user" /> Create Your Account
            </p>
          </div>
          <Form onSubmit={handleSubmit} className="form-login">
            <Form.Group>
              <Form.Control type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange}/>
              {errors.name && <small className="form-text text-danger">{errors.name}</small>}
            </Form.Group>

            <Form.Group>
              <Form.Control type="email" placeholder="Email Address" name="email" value={formData.email}
                onChange={handleChange}/>
              {errors.email && <small className="form-text text-danger">{errors.email}</small>}
            </Form.Group>

            <Form.Group>
              <Form.Control type="password" placeholder="Password" name="password" value={formData.password}onChange={handleChange}/>
              {errors.password && <small className="form-text text-danger">{errors.password}</small>}
            </Form.Group>

            <Form.Group>
              <Form.Control type="password" placeholder="Confirm Password" name="password2" value={formData.password2} onChange={handleChange}/>
            </Form.Group>
            {loading ? (
              <Button className="btn-block" variant="primary" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
              </Button>
            ) : (
              <Button className="btn-block" type="submit" variant="success">
                Register
              </Button>
            )}

            <Button className="btn-block" type="button" variant="light" onClick={fillFakeData}>
              Fill in fake data
            </Button>

            <p>Already have an account? <Link to="/login">Sign In</Link></p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
