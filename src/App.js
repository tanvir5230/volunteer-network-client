import React, { createContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import { firebaseConfig } from "./firebaseConfig";

import * as firebase from "firebase/app";
import "firebase/auth";

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
            <PrivateRoute path="/register/:id">
              <Register />
            </PrivateRoute>
            <Route path="/login">
              <Login firebase={firebase} />
            </Route>
          </Switch>
        </BrowserRouter>
      </userContext.Provider>
    </>
  );
}

export default App;
