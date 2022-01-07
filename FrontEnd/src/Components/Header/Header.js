import { Link } from "react-router-dom";
import "./Header.css";
import {
  clearLocalStorage,
  getIsLoggedIn,
  getName,
  getToken,
  getUsername,
} from "../../Config/LocalStorage";
import { getPrivilege } from "../../Functions/userFunctions";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";

function Header(props) {
  const username = getUsername();
  const token = getToken();
  const isLoggedIn = getIsLoggedIn();
  const name = getName();
  const [isSuperUser, setIsSuperUser] = useState();

  const notLoggedButtons = [
    {
      link: "/Login",
      label: "Login",
    },
    {
      link: `/Register`,
      label: "Register",
    },
  ];

  const loggedButtons = [
    {
      link: `/Profile/${username}`,
      label: "Profile",
      onClick: null,
    },
    {
      link: "/",
      label: "LogOut",
      onClick: clearLocalStorage,
    },
  ];

  const getUserPrivilege = useCallback(async () => {
    setIsSuperUser(getPrivilege(username, token));
  }, [setIsSuperUser, token, username]);

  useEffect(() => {
    getUserPrivilege();
  }, [getUserPrivilege]);

  return (
    <header className="header-format">
      <div>
        {isLoggedIn ? (
          <div>
            <label className="header__text-with-name">
              Bienvenido {name}. Tome asiento
            </label>
          </div>
        ) : null}
        <Link to={"/"}>
          <div className="header__button-size--medium header__button-format ">
            <label className="header__button__text">Home</label>
          </div>
        </Link>
        {!isLoggedIn ? (
          <>
            {notLoggedButtons.map((item, index) => (
              <Link to={item.link} key={index}>
                <div className="header__button-size--medium header__button-format  ">
                  <label className="header__button__text">{item.label}</label>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <>
            {isSuperUser && (
              <Link
                to={`/Gestion_Productos`}>
                <div className="header__button-size--large header__button-format">
                  <label className="header__button__text">
                    Gestionar Productos
                  </label>
                </div>
              </Link>
            )}
            {loggedButtons.map((item, index) => (
              <Link to={item.link} key={index}>
                <div
                  className="header__button-size--medium header__button-format"
                  onClick={item.onClick}
                >
                  <label className="header__button__text">{item.label}</label>
                </div>
              </Link>
            ))}{" "}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
