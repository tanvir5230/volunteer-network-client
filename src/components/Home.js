import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Loader from "./Loader";

const Home = () => {
  const [events, setEvents] = useState(null);

  const bgs = ["#FFBD3E", "#FF7044", "#3F90FC", "#421FCF"];

  useEffect(() => {
    const url = "https://volunteer-network-server-t.herokuapp.com";
    fetch(`${url}/`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => {
        alert("try again");
      });
  }, []);
  return (
    <Container style={{ backgroundColor: "#f8f9fa" }}>
      <Search />
      <Row className="my-5 justify-content-center">
        {events === null && <Loader />}
        {events &&
          events.map((event, ind) => {
            const i = ind + 1;
            let bg = "blue";
            if ((i - 1) % 4 === 0) {
              bg = bgs[0];
            } else if ((i - 2) % 4 === 0) {
              bg = bgs[1];
            } else if ((i - 3) % 4 === 0) {
              bg = bgs[2];
            } else {
              bg = bgs[3];
            }

            return (
              <Col xs={10} md={4} lg={3} key={event._id} className="mt-3 p-4">
                <Link
                  to={{
                    pathname: `/register/${event.name}`,
                  }}
                  onClick={() => {
                    sessionStorage.setItem("image", event.image);
                  }}
                >
                  <div className="position-relative">
                    <img src={event.image} alt="" className="img-fluid" />
                    <h6
                      className="position-absolute w-100 text-center text-capitalize text-white py-3 rounded"
                      style={{ bottom: "-9px", backgroundColor: bg }}
                    >
                      {event.name}
                    </h6>
                  </div>
                </Link>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

const Search = () => {
  return (
    <Row className="justify-content-center text-center mt-5">
      <Col xs={12} md={8}>
        <h4 className="text-uppercase font-weight-bold">
          I grow by helping people in need.
        </h4>
        <div className="pl-3 w-50 m-auto border rounded-pill d-flex">
          <input className="border-0 w-100" type="text" />
          <button className="btn btn-primary rounded-pill d-inline-block ml-auto">
            Search
          </button>
        </div>
      </Col>
    </Row>
  );
};
export default Home;
