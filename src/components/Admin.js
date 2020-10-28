import Axios from "axios";
import React, { useEffect, useState } from "react";
import {
  NavLink,
  Redirect,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import { Col, Container, Row, Table } from "reactstrap";

const Admin = () => {
  const { url, path } = useRouteMatch();

  const [volList, setVolList] = useState(null);

  useEffect(() => {
    const url = "https://volunteer-network-server-t.herokuapp.com";
    fetch(url + "/admin/volunteer-list")
      .then((res) => res.json())
      .then((data) => setVolList(data))
      .catch((err) => alert(err.message));
  }, []);
  return (
    <Container>
      <ListHeader />

      <Row>
        <SideNav url={url} />

        <Col xs={10} md={9} className="px-3">
          <Switch>
            <Route path={`${path}/volunteer-list`}>
              <VolunteerList volList={volList} />
            </Route>
            <Route path={`${path}/create-event`}>
              <CreateEvent />
            </Route>
            <Redirect to={`${url}/volunteer-list`} />
          </Switch>
        </Col>
      </Row>
    </Container>
  );
};

const ListHeader = () => {
  return (
    <Row className="mt-2 bg-white py-4">
      <Col xs="4" md="4">
        <img src={require("../resources/logos/logo.png")} alt="" width="120" />
      </Col>
      <Col xs={12} md={8}>
        <h4>vounteer lists</h4>
      </Col>
    </Row>
  );
};

const SideNav = ({ url }) => {
  return (
    <Col xs="2" md="3" className="bg-white" style={{ height: "90vh" }}>
      <NavLink
        activeStyle={{ color: "blueviolet" }}
        to={`${url}/volunteer-list`}
        className="text-left font-weight-bold btn p-0 btn-block border-0"
      >
        <span>
          <img
            src={require("../resources/logos/users-alt 1.png")}
            className="img-fluid"
            alt=""
          />
        </span>
        <span className="d-none d-md-inline">volunteer registerd lists</span>
      </NavLink>
      <NavLink
        to={`${url}/create-event`}
        className="text-left font-weight-bold btn p-0 btn-block border-0"
        activeStyle={{ color: "blueviolet" }}
      >
        <span>
          <img
            src={require("../resources/logos/plus 1.png")}
            className="img-fluid mr-md-2"
            width="35"
            alt=""
          />
        </span>
        <span className="d-none d-md-inline">create-event</span>
      </NavLink>
    </Col>
  );
};

const CreateEvent = () => {
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

  const [name, setName] = useState("");
  const [date, setDate] = useState(today);
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("file", file);

    Axios.post(
      "https://volunteer-network-server-t.herokuapp.com/addEvent",
      data
    )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <form
      method="post"
      encType="multipart/form-data"
      action="https://volunteer-network-server-t.herokuapp.com/addEvent"
      style={{ width: "400px" }}
    >
      <input
        type="text"
        name="event"
        className="form-control border"
        placeholder="event title"
        onInput={(e) => setName(e.target.value)}
        required
      />
      <input
        type="date"
        name="date"
        className="form-control border"
        value={date}
        min={today}
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        type="file"
        className="form-control-file mt-3"
        placeholder="upload image"
        name="banner"
        onInput={(e) => setFile(e.target.files[0])}
        required
      />
      <button
        // onClick={(e) => handleSubmit(e)}
        className="btn btn-success rounded-pill btn-block mt-3"
      >
        submit
      </button>
    </form>
  );
};

const VolunteerList = ({ volList }) => {
  const handleDelete = (e, id) => {
    e.persist();
    const url = "https://volunteer-network-server-t.herokuapp.com";
    fetch(`${url}/deleteVol/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          e.target.parentNode.parentNode.parentNode.remove();
        }
      })
      .catch((err) => alert("couldn't delete"));
  };

  return (
    <div className="bg-white">
      <Table responsive>
        <thead className="mt-2">
          <tr style={{ backgroundColor: "#f8f9fa" }}>
            <th>Name</th>
            <th>Email ID</th>
            <th>Registration date</th>
            <th>Category</th>
            <th>action</th>
          </tr>
        </thead>

        <tbody>
          {volList === null && (
            <tr>
              <td>loading...</td>
            </tr>
          )}
          {volList &&
            volList.map((vol) => {
              return (
                <tr key={vol._id}>
                  <td>{vol.name}</td>
                  <td>{vol.email}</td>
                  <td>{vol.date}</td>
                  <td>{vol.event}</td>
                  <td>
                    <button className="btn btn-danger">
                      <img
                        src={require("../resources/logos/trash-2 9.png")}
                        width="35"
                        alt=""
                        className="img-fluid"
                        onClick={(e) => handleDelete(e, vol._id)}
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default Admin;
