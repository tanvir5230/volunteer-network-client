import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { userContext } from "../App";

function PrivateRouteEvent({ children, ...rest }) {
  const { user } = useContext(userContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location, place: "event" },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRouteEvent;
