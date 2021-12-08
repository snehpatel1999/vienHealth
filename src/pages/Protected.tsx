
import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { useAuth } from "../context/authProvider";

const Protected =({children, ...props}: RouteProps) => {
  const { user } = useAuth();
  

  return (
    <Route exact {...props}
      render={({ location }) =>
        user.userInfo ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default Protected;