/* eslint-disable react/jsx-pascal-case */
import "./Gestion_Productos.css";
import { getAllItems } from "../services/productServices";
import { useState, useEffect } from "react";
import Product_Manage from "../Components/Product_Manage";

function Gestion_Productos() {
  const [items, setItem] = useState([]);
  const getItems = async () => {
    try {
      getAllItems().then((products) => {
        setItem(products);
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
        <Product_Manage
          item={items[index]}
          key={index}
          className="product_manage-container"
        />
      ))}
    </div>
  );
}

export default Gestion_Productos;
