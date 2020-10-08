import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";
import { userContext } from "../App";
import logo from "../resources/logos/logo.png";

const NavigationBar = ({ firebase }) => {
  const { user, setUser } = useContext(userContext);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        setUser(null);
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  return (
    <div className="container-md">
      <Navbar color="light" light expand="md">
        <Link to="/">
          <img src={logo} width="150" height="40" alt="" />
        </Link>

        {user === null && (
          <div className="d-md-none">
            <Link
              to={{ pathname: "/login" }}
              className="btn btn-primary ml-auto mr-1"
            >
              L
            </Link>
            <Link to={{ pathname: "/admin" }} className="btn btn-dark mr-1">
              A
            </Link>
            <NavbarToggler onClick={toggle} className="ml-auto border-0 " />
          </div>
        )}

        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <Link to="/dontaion">Donation</Link>
            </NavItem>
            <NavItem>
              <Link to="/events">Events</Link>
            </NavItem>
            <NavItem>
              <Link to="/blog">Blog</Link>
            </NavItem>
          </Nav>
        </Collapse>

        {user === null && (
          <div className="d-none d-md-block">
            <Link
              to={{ pathname: "/login" }}
              className="btn btn-primary ml-auto mr-3"
            >
              Login
            </Link>
            <Link to={{ pathname: "/admin" }} className="btn btn-dark">
              Admin
            </Link>
          </div>
        )}
        {user && (
          <div className="d-flex align-items-center">
            <span className="font-weight-bold">{user.displayName}</span>
            <button
              className="btn btn-danger rounded-pill ml-2"
              onClick={handleSignout}
            >
              Signout
            </button>
            <Link to={{ pathname: "/admin" }} className="btn btn-dark">
              Admin
            </Link>
          </div>
        )}
      </Navbar>
    </div>
  );
};

export default NavigationBar;
