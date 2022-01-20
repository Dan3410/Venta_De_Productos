import { Link } from "react-router-dom";
import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { getPrivilege } from "../../Functions/userFunctions";
import { useEffect } from "react";
import { useState } from "react";

function Header(props) {
  const username = props.username;
  const token = props.token;
  const isLoggedIn = props.isLoggedIn;
  const name = props.name;
  const [isSuperUser, setIsSuperUser] = useState();

  function logOutUser(){
    props.deleteAllProductsFromCart();
    props.deleteUserData();
    //Esto fuerza el re-render
    setIsSuperUser(false)
  }
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
      onClick: logOutUser,
    },
  ];

  useEffect(() => {
    setIsSuperUser(getPrivilege(token))
  }, [token]);

  return (
    <header className="header-format">
      <nav>
        {isLoggedIn ? (
          <div>
            <label className="header__text-with-name">Bienvenido {name}.</label>
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
            ))}
            <Link to={`/Cart/${username}`}>
              <div className="header__button-size--medium header__button-format">
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="header-container__icon"
                />
              </div>
            </Link>{" "}
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
