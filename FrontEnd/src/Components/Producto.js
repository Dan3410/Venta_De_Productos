import React from "react";
import { Link } from "react-router-dom";
import "./Producto.css";
//Definicion de clase
function Producto(props) {
  return (
    <div className="product-display">
      <img
        className="product-display__image"
        src={props.itemAMostrar.photo}
        alt="error loading"
      />
      <div className="product-display__name">
        <label>Nombre del producto: </label>
        {props.itemAMostrar.name}
      </div>
      <div>
        <label>Precio: {props.itemAMostrar.price}</label>
      </div>
      <div>
        <label>Sku:{props.itemAMostrar.code}</label>
      </div>
      <Link to={"/ProductDetail/" + props.itemAMostrar._id + "/"}>
        <button>
          <label>Ver Detalle</label>
        </button>
      </Link>
    </div>
  );
}

export default Producto;
