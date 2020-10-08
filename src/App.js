import React, { createContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import PrivateRouteEvent from "./components/PrivateRouteEvent";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import { firebaseConfig } from "./firebaseConfig";

import * as firebase from "firebase/app";
import "firebase/auth";
import RegisteredEvents from "./components/RegisteredEvents";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import Admin from "./components/Admin";
import PrivateEvents from "./components/PrivateEvents";

firebase.initializeApp(firebaseConfig);

export const userContext = createContext();

function App() {
  const [user, setUser] = useState(firebase.auth().currentUser);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [user]);
  return (
    <>
      <userContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <NavigationBar firebase={firebase} />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <PrivateRouteEvent path="/register/:id">
              <Register />
            </PrivateRouteEvent>
            <PrivateRouteAdmin path="/admin">
              <Admin />
            </PrivateRouteAdmin>
            <Route path="/login">
              <Login firebase={firebase} />
            </Route>
            <PrivateEvents path="/registeredEvents">
              <RegisteredEvents />
            </PrivateEvents>
          </Switch>
        </BrowserRouter>
      </userContext.Provider>
    </>
  );
}

export default App;
