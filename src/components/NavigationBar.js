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
      });
  };

  return (
    <div className="container-lg">
      <Navbar color="light" light expand="lg">
        <Link to="/">
          <img src={logo} width="150" height="40" alt="" />
        </Link>

        {/* smaller view when user not logged in */}
        {user === null && (
          <div className="d-lg-none ml-auto">
            <Link to={{ pathname: "/login" }} className="btn p-1 mr-1">
              <img
                src={require("../resources/logos/login.png")}
                alt=""
                width="30"
              />
            </Link>
            <Link to={{ pathname: "/admin" }} className="btn p-0 btn-dark mr-1">
              <img
                src={require("../resources/logos/admin.png")}
                alt=""
                width="30"
              />
            </Link>
          </div>
        )}
        <NavbarToggler onClick={toggle} className="border-0 " />
        <Collapse isOpen={isOpen} navbar className="text-right">
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <Link to="/dontaion">Donation</Link>
            </NavItem>
            {user && (
              <NavItem>
                <Link to={`/registeredEvents?email=${user.email}`}>Events</Link>
              </NavItem>
            )}
            <NavItem>
              <Link to="/blog">Blog</Link>
            </NavItem>
          </Nav>
          {user && (
            <div className="d-flex justify-content-end align-items-center">
              <span className="font-weight-bold">
                {user.displayName.slice(0, 6)}
              </span>
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
        </Collapse>

        {/* larger view when user not logged in */}
        {user === null && (
          <div className="d-none d-lg-block">
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
        {/* when user logged in */}
      </Navbar>
    </div>
  );
};

export default NavigationBar;
