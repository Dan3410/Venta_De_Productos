import { Link } from "react-router-dom";
import { useEffect } from "react";
import userContext from "../Config/context";
import "./Header.css";

function Header(props) {
    /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {}, [userContext.name]);

  return (
    <userContext.Consumer>
      {(context) => (
        <header className="header">
          {!context.isLoggedIn && (
            <div>
              <Link to={"/"}>
                <div className="headerButton">
                  <div className="buttonText"> Home</div>
                </div>
              </Link>
              <Link to={"/Login"}>
                <div className="headerButton buttonText"> Login </div>
              </Link>
              <Link to={`/Register`}>
                <div className="headerButton buttonText"> Register </div>
              </Link>
            </div>
          )}
          {context.isLoggedIn && (
            <div>
              <div className="textWithName">
                {" "}
                Bienvenido {context.name}!. Tome asiento
              </div>
              <Link to={"/"}>
                <div className="headerButton buttonText"> Home </div>
              </Link>
              <Link to={"/"}>
                <div
                  className="headerButton buttonText"
                  onClick={context.logOutUserContext}
                >
                  {" "}
                  LogOut
                </div>
              </Link>
              <Link to={`/Profile/${context.userName}`}>
                <div className="headerButton buttonText"> Profile </div>
              </Link>
            </div>
          )}
        </header>
      )}
    </userContext.Consumer>
  );
}

export default Header;
