import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const RegisteredEvents = () => {
  const [events, setEvents] = useState(null);
  let query = useQuery();

  useEffect(() => {
    const url = "http://localhost:5000";
    fetch(url + "/registeredEvents?" + query)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => alert(err));
    console.log(events);
  }, []);

  return (
    <Container>
      <Row className="justify-content-center">
        {events === null && (
          <Col xs={10} md={6}>
            <div className="text-center">loading...</div>
          </Col>
        )}
        {events &&
          events.map((event) => {
            return (
              <Col key={event._id} xs={10} md={6}>
                {event.event}
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

export default RegisteredEvents;
