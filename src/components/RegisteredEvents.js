import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Loader from "./Loader";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const RegisteredEvents = () => {
  const [events, setEvents] = useState(null);
  let query = useQuery();

  useEffect(() => {
    const url = "https://volunteer-network-server-t.herokuapp.com";
    fetch(url + "/registeredEvents?" + query)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      });
  }, []);

  const handleCancel = (e, id) => {
    e.persist();
    const url = "https://volunteer-network-server-t.herokuapp.com";
    fetch(url + "/event/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          e.target.parentNode.parentNode.remove();
        }
      });
  };

  return (
    <Container>
      <Row className="justify-content-center justify-content-md-start mt-5">
        {events === null && (
          <Col xs={10} md={6}>
            <Loader />
          </Col>
        )}
        {events &&
          events.map((event) => {
            return (
              <Col key={event._id} xs={10} md={6}>
                <div className="bg-white py-3 px-4 rounded-lg">
                  <img
                    src={event.image}
                    alt={event.event}
                    width="115px"
                    height="110px"
                    className="float-left mr-3"
                  />
                  <div>
                    <h5>{event.event}</h5>
                    <p>{event.date}</p>
                  </div>
                  <button
                    className="btn btn-outline-primary ml-auto"
                    onClick={(e) => {
                      handleCancel(e, event._id);
                    }}
                  >
                    cancel
                  </button>
                </div>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

export default RegisteredEvents;
