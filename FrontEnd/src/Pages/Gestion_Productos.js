/* eslint-disable react/jsx-pascal-case */
import "./Gestion_Productos.css";
import { getAllItems } from "../services/productServices";
import { useState, useEffect } from "react";
import Product_Manage from "../Components/Product_Manage";
import { Link } from "react-router-dom";

function Gestion_Productos() {
  const [items, setItem] = useState([]);

  const getItems = async () => {
    try {
      getAllItems().then((products) => {
        setItem(products.data);
      });
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  useEffect(() => {
    getItems();
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
