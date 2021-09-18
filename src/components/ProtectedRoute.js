import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../ui/authentication/auth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  var redirect = { pathName: "/" };

  return (
    <Route
      {...rest}
      render={(props) => {
        console.log("auth.isAuthenticated", auth.isAuthenticated());
        if (auth.isAuthenticated()) return <Component {...props} />;
        else {
          return <Redirect to={redirect} />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
