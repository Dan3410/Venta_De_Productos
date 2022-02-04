import React from "react";
import { Link } from "react-router-dom";
import "./ProductDisplay.scss";
//Definicion de clase
function ProductDisplay(props) {
  return (
    <Link to={"/ProductDetail/" + props.itemAMostrar._id + "/"}>
      <div className="product-display">
        <img
          className="product-display__image"
          src={props.itemAMostrar.photo}
          alt="error loading"
        />
        <div className="product-display__name-container">
          <label className="name-container__text"> {props.itemAMostrar.name}</label>
          
        </div>
        <div >
          <label className="price-container__text">Precio: {props.itemAMostrar.price}</label>
        </div>
        <div >
          <label className="code-container__text">Código:{props.itemAMostrar.code}</label>
        </div>
      </div>
    </Link>
  );
}

export default ProductDisplay;
