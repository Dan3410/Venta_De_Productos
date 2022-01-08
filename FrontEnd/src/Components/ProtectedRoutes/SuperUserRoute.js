import { Redirect, Route } from "react-router-dom";
import {
  getIsLoggedIn,
  getToken,
  getUsername,
} from "../../Config/LocalStorage/LocalStorage";
import { getPrivilege } from "../../Functions/userFunctions";

function SuperUserRoute({ component: Component, ...restOfProps }) {
  const isLoggedIn = getIsLoggedIn();
  const username = isLoggedIn ? getUsername() : null;
  const token = isLoggedIn ? getToken() : null;
  let isSuperUser = getPrivilege(username, token);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isLoggedIn && isSuperUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

export default SuperUserRoute;
