import { Redirect, Route } from "react-router-dom";
import { getPrivilege } from "../../../Functions/userFunctions";

function SuperUser({ component: Component, ...restOfProps }) {
  const isLoggedIn = restOfProps.isLoggedIn
  const token = restOfProps.token;

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isLoggedIn && getPrivilege(token) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

export default SuperUser;
