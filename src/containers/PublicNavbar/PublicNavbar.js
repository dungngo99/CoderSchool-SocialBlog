import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/actions/auth.actions";

const PublicNavbar = () => {
  //Dispatch to send action to redux reducer
  const dispatch = useDispatch();

  //Get global state from redux store (attribute auth)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  //Function to handle logout
  const handleLogout = (event) => {
    //Handle logout event here
    dispatch(authActions.logout());
  };

  //Public link for unauthenticated user
  const authLink = (
    <Nav>
      <Nav.Link as={Link} to="/dashboard">
        <i className="fas fa-chart-line" /> Dashboard
      </Nav.Link>
      <Nav.Link as={Link} to='/' onClick={(event) => handleLogout(event)}>
        <i className="fas fa-sign-out-alt" /> Logout
      </Nav.Link>
    </Nav>
  );

  //Private link for authenticated user
  const publicLink = (
    <div>
      <Nav>
        <Nav.Link as={Link} to="/register">
          <i className="fas fa-registered" /> Register
    </Nav.Link>
        <Nav.Link as={Link} to="/login">
          <i className="fas fa-sign-in-alt" /> Login
    </Nav.Link>
      </Nav>
    </div>
  );

  return (
    <div>
      <Navbar fixed="top" className="Navbar-style" >
        <Navbar.Brand as={Link} to="/" className="mr-auto ">
          {/* <img
            src="https://s3.amazonaws.com/cdn.designcrowd.com/blog/2018/May/5-Steps-to-Designing-an-Eye-Catching-Travel-Blog/DI_5-Steps-To-Designing-An-Eye-Catching-Travel-Blog_Banner_828x300.jpg"
            alt="CoderSchool"
          /> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          {!loading && <>{isAuthenticated ? authLink : publicLink}</>}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default PublicNavbar;
