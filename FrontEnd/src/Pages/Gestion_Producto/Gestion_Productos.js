/* eslint-disable react/jsx-pascal-case */
import "./Gestion_Productos.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Product_Manage from "../../Components/Product_Manage/Product_Manage";
import { Link } from "react-router-dom";
import { getItems } from "../../Functions/productsFunctions";
import {
  getIsLoggedIn,
  getToken,
  getUsername,
} from "../../Config/LocalStorage";
import { getPrivilege } from "../../Functions/userFunctions";

function Gestion_Productos(props) {
  const [items, setItem] = useState([]);

  const isLoggedIn = getIsLoggedIn();
  const username = getUsername();
  const token = getToken();

  let history = useHistory();

  useEffect(() => {
    if (isLoggedIn) {
      const isSuperUser = getPrivilege(username, token);
      if (isSuperUser) {
        getItems(setItem);
      } else {
        history.push("/");
      }
    } else {
      history.push("/Login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {items.map((item, index) => (
        <Product_Manage item={items[index]} key={index} />
      ))}
      <Link to={"/Agregar_Producto"}>
        <div className="add-product-container">
          <button className="add-product-container__button">
            <label>Agregar Producto </label>
          </button>
        </div>
      </Link>
    </div>
  );
}

export default Gestion_Productos;
