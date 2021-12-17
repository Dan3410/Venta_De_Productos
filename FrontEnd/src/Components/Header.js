import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./Header.css";
import { clearLocalStorage } from "../Config/LocalStorage";

function Header(props) {
  const name = localStorage.getItem("name");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("name"), localStorage.getItem("isLoggedIn")]);

  return (
    <header className="header-format">
      {!isLoggedIn && (
        <div>
          <Link to={"/"}>
            <div className="header__button">
              <label className="header__button__text">Home</label>
            </div>
          </Link>
          <Link to={"/Login"}>
            <div className="header__button ">
              <label className="header__button__text">Login</label>
            </div>
          </Link>
          <Link to={`/Register`}>
            <div className="header__button ">
              <label className="header__button__text">Register</label>
            </div>
          </Link>
        </div>
      )}
      {isLoggedIn && (
        <div>
          <div >
            <label className="header__text-with-name">Bienvenido {name}. Tome asiento</label>
          </div>
          <Link to={"/"}>
            <div className="header__button">
              <label className="header__button__text">Home</label>
            </div>
          </Link>
          <Link to={"/"}>
            <div className="header__button " onClick={clearLocalStorage}>
              <label className="header__button__text">LogOut</label>
            </div>
          </Link>
          <Link to={`/Profile/${userName}`}>
            <div className="header__button ">
              <label className="header__button__text">Profile</label>
            </div>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
