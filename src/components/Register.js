import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { userContext } from "../App";

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}
today = yyyy + "-" + mm + "-" + dd;

const Register = () => {
  const [date, setDate] = useState(today);

  const { user } = useContext(userContext);
  const history = useHistory();
  const eventName = history.location.state.event;

  return (
    <>
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
          <Col xs={12}>
            <h4 className="mt-3 font-weight-bold text-center">
              Register as a volunteer
            </h4>
          </Col>
          <Col
            xs={10}
            md={5}
            lg={4}
            className="mb-5"
            style={{ border: "1px solid #00000040" }}
          >
            <div className="form-control font-weight-bold">
              {user.displayName}
            </div>
            <div className="form-control font-weight-bold">{user.email}</div>

            <div className="form-control font-weight-bold">{eventName}</div>

            <input
              type="text"
              name="description"
              className="form-control font-weight-bold"
              placeholder="description"
            />
            <input
              type="date"
              name="date"
              id="date"
              className="form-control font-weight-bold"
              min={today}
              value={date}
              onInput={(e) => setDate(e.target.value)}
            />
            <input
              type="submit"
              className="btn btn-block btn-primary reg-btn"
              value="Register"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
