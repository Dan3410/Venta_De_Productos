import { Redirect, Route } from "react-router-dom";
import {
  getIsLoggedIn,
  getToken
} from "../../Config/LocalStorage/LocalStorage";
import { getPrivilege } from "../../Functions/userFunctions";

function SuperUserRoute({ component: Component, ...restOfProps }) {
  const isLoggedIn = getIsLoggedIn();
  const token = isLoggedIn ? getToken() : null;

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

export default SuperUserRoute;
