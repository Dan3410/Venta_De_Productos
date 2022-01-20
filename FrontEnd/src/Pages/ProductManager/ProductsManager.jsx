/* eslint-disable react/jsx-pascal-case */
import "./ProductsManager.scss";
import { useState, useEffect } from "react";
import Product_Manage from "../../Components/Product_Manage/Product_Manage.jsx";
import { Link } from "react-router-dom";
import { getItems } from "../../Functions/productsFunctions";
import { deleteProductById } from "../../services/productServices";

function ProductsManager(props) {
  const [items, setItem] = useState([]);
  const username = props.username
  const token = props.token

  function deleteProduct(id){
    deleteProductById(id, username, token);
  }

  useEffect(() => {
    getItems(setItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {items.map((item, index) => (
        <Product_Manage
          item={items[index]}
          key={index}
          token={props.token}
          username={props.username}
          deleteProduct={deleteProduct}
        />
      ))}
      <Link to={"/Agregar_Producto"}>
        <div className="add-product-container">
          <button className="button">
            <label>Agregar Producto </label>
          </button>
        </div>
      </Link>
    </div>
  );
}

export default ProductsManager;
