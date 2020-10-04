import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { data } from "../data";
import img from "../resources/images/babySit.png";

const Home = () => {
  return (
    <Container>
      <Search />
      <Row>
        {data.map((event) => {
          return (
            <Col xs={10} md={4} lg={3} key={event.name} className="mt-3">
              <Link
                to={{
                  pathname: `/register`,
                  state: {
                    event: `${event.name}`,
                  },
                }}
              >
                <div className="position-relative">
                  <img src={img} alt="" className="img-fluid" />
                  <h4
                    className="position-absolute bg-warning w-100 text-center text-capitalize py-3"
                    style={{ bottom: "0" }}
                  >
                    {event.name}
                  </h4>
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
