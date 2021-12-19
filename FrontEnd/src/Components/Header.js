import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./Header.css";
import { clearLocalStorage } from "../Config/LocalStorage";

function Header(props) {
  const name = localStorage.getItem("name");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isSuperUser = localStorage.getItem("isSuperUser") === "true";
  const userName = localStorage.getItem("userName");
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
      link: `/Profile/${userName}`,
      label: "Profile",
      onClick: null,
    },
    {
      link: "/",
      label: "LogOut",
      onClick: clearLocalStorage,
    },
  ];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("name"), localStorage.getItem("isLoggedIn")]);

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
              <Link to={`/Gestion_Productos`}>
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
