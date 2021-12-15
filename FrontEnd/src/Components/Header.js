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
                <div className="header__button">
                  <div className="header__button__text"> Home</div>
                </div>
              </Link>
              <Link to={"/Login"}>
                <div className="header__button header__button__text"> Login </div>
              </Link>
              <Link to={`/Register`}>
                <div className="header__button header__button__text"> Register </div>
              </Link>
            </div>
          )}
          {context.isLoggedIn && (
            <div>
              <div className="header__text-with-name">
                {" "}
                Bienvenido {context.name}!. Tome asiento
              </div>
              <Link to={"/"}>
                <div className="header__button header__button__text"> Home </div>
              </Link>
              <Link to={"/"}>
                <div
                  className="header__button header__button__text"
                  onClick={context.logOutUserContext}
                >
                  {" "}
                  LogOut
                </div>
              </Link>
              <Link to={`/Profile/${context.userName}`}>
                <div className="header__button header__button__text"> Profile </div>
              </Link>
            </div>
          )}
        </header>
      )}
    </userContext.Consumer>
  );
}

export default Header;
