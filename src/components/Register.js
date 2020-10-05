import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
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
  const { user } = useContext(userContext);
  const { id } = useParams();
  const history = useHistory();
  const eventName = id;
  console.log(history, "reg");

  const [date, setDate] = useState(today);
  const [des, setDes] = useState("");
  const [regData, setRegData] = useState({
    name: user.displayName,
    email: user.email,
    event: eventName,
    date: date,
    description: des,
  });

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === "date") {
      setDate(value);
    } else {
      setDes(value);
    }
    const newData = { ...regData, [name]: value };
    setRegData(newData);
  };

  const handleRegister = async () => {
    const url = "http://localhost:5000";
    await fetch(url + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(regData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          alert("successfull");
        }
      })
      .catch((err) => {
        alert("not possible to add. try again.");
      });
    history.push("/registeredEvents?email=" + user.email);
  };

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
              onBlur={(e) => handleBlur(e)}
            />
            <input
              type="date"
              name="date"
              id="date"
              className="form-control font-weight-bold"
              min={today}
              value={date}
              onInput={(e) => setDate(e.target.value)}
              onBlur={(e) => handleBlur(e)}
            />
            <input
              type="submit"
              className="btn btn-block btn-primary reg-btn"
              value="Register"
              onClick={handleRegister}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
