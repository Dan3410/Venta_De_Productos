import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
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
  const history = useHistory();
  const [isSuperUser, setIsSuperUser] = useState();

  function logOutUser() {
    props.deleteAllProductsFromCart();
    props.deleteUserData();
    //Esto fuerza el re-render
    setIsSuperUser(false);
    history.push("/");

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
      link: 'LogOut',
      label: "LogOut",
      onClick: logOutUser,
    },
  ];

  useEffect(() => {
    setIsSuperUser(getPrivilege(token));
  }, [token]);

  return (
    <header className="header-format">
      <nav>
        {isLoggedIn ? (
          <div>
            <label className="header__text-with-name">Bienvenido {name}.</label>
          </div>
        ) : null}
        <NavLink
          exact to={"/"}
          className="header__button-size--medium header__button-format "
        >
          <label className="header__button__text">Home</label>
        </NavLink>
        {!isLoggedIn ? (
          <>
            {notLoggedButtons.map((item, index) => (
              <NavLink
              exact to={item.link}
                key={index}
                className="header__button-size--medium header__button-format  "
              >
                <label className="header__button__text">{item.label}</label>
              </NavLink>
            ))}
          </>
        ) : (
          <>
            {isSuperUser && (
              <NavLink
              exact to={`/Gestion_Productos`}
                className="header__button-size--large header__button-format"
              >
                <label className="header__button__text">
                  Gestionar Productos
                </label>
              </NavLink>
            )}
            {loggedButtons.map((item, index) => (
              <NavLink
                exact to={item.link}
                key={index}
                className="header__button-size--medium header__button-format"
                onClick={item.onClick}
              >
                <label className="header__button__text">{item.label}</label>
              </NavLink>
            ))}
            <NavLink
              exact to={`/Cart/${username}`}
              className="header__button-size--medium header__button-format"
            >
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="header-container__icon"
              />
            </NavLink>{" "}
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
