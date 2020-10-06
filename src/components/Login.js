import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { userContext } from "../App";

const Login = ({ firebase }) => {
  let { user, setUser } = useContext(userContext);
  const history = useHistory();

  if (history.location.state !== "nav") {
    var id = history.location.state.from.pathname.split("/")[2];
  }
  if (user) {
    history.push("/admin");
  }

  const provider = new firebase.auth.GoogleAuthProvider();

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        setUser(result.user);
        if (history.location.state === "nav") {
          history.push("/");
        } else {
          if (history.location.state.from.state === "admin") {
            history.push("/admin");
          } else {
            history.push("/register/" + id);
          }
        }
      });
  };

  return (
    <Container>
      <Row
        className="justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <Col xs={12} className="mt-5 d-flex justify-content-center ">
          <img
            src={require("../resources/logos/logo.png")}
            alt=""
            width="200"
          />
        </Col>
        <Col
          xs={10}
          md={5}
          lg={4}
          className="d-flex justify-content-center align-items-center mb-5"
          style={{ height: "40vh", border: "1px solid #00000040" }}
        >
          <div className="text-center w-100 px-3">
            <h5 className="font-weight-bold mb-4">Login With</h5>
            <div className="rounded-pill border mb-2">
              <button className="btn btn-block" onClick={handleSignIn}>
                <img
                  src={require("../resources/logos/google.png")}
                  alt=""
                  width="25"
                  height="25"
                  className="float-left"
                />
                <span className="d-block">Continue with Google</span>
              </button>
            </div>
            <div>
              <span>Don't have an account? </span>
              <Link to="/login" className="border-bottom border-primary">
                Create one
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
