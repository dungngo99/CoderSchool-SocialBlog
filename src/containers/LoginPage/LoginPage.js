import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { authActions } from "../../redux/actions/auth.actions";

const LoginPage = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { email, password } = formData;
    if (!email || !password) {
      setErrors({
        ...errors,
        email: "Please fill out email",
        password: "Please fill out password",
      });
      return;
    }
    dispatch(authActions.loginRequest({ email, password }));
  };

  //Redirect to homepage whenever user is authenticated
  if (isAuthenticated) return <Redirect to="/"></Redirect>;

  return (
    <Container className="bg-loggin">
      <Col className ="col-loggin">
      <Row>
      <h1 className="style-quote">
        “Traveling – it leaves you speechless, then turns you into a
        storyteller.”
      </h1>
      </Row>
      <Row>
        <Form onSubmit={handleSubmit} className="form-loggin">
          <div className="text-center mb-3">
            <h1 className="text-primary">Sign In</h1>
          </div>
          <div>
            <Form.Group>
              <Form.Control
                type="email"
                required
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
                minLength="3"
              />
              {errors.password && (
                <small className="form-text text-danger">
                  {errors.password}
                </small>
              )}
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
              <Button className="btn-block" type="submit" variant="success">
                Login
              </Button>
            )}
            <p>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </Form>
      </Row>
      </Col>
    </Container>
  );
};

export default LoginPage;
