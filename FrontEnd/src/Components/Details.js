import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Details.css";
import { getItemById } from "../services/productServices";

function Details(props) {
  const [itemData, setData] = useState([]);
  const [text, setText] = useState([]);
  const isLoggedIn = useState(localStorage.getItem("isLoggedIn"));

  function handlePurchase(event) {
    setText("Gracias Por Su Compra");
    event.preventDefault();
    event.stopPropagation();
  }

  useEffect(() => {
    const getItem = async () => {
      try {
        getItemById(props.idItemAMostrar).then((response) => {
          setData(response.data);
        });
      } catch (e) {
        console.log("Error", e);
      }
    };

    getItem();
  }, [props.idItemAMostrar]);

  return (
    <div className="product-details-container">
      <img
        className="product-details-container__image"
        src={itemData.photo}
        alt="error loading"
      />
      <h2>
        <label> {itemData.name}</label>
      </h2>
      <div>
        <label>Descripcion: {itemData.description}</label>
      </div>
      <div className="product-details-container__price">
        <label>Precio: {itemData.price}</label>
      </div>
      <div>
        <label>SKU: {itemData.code}</label>
      </div>
      <div> {text} </div>
      {isLoggedIn && (
        <button onClick={handlePurchase}>
          <label> Comprar </label>
        </button>
      )}
      {!isLoggedIn && (
        <div>
          <label className="product-details-container__warning-message">
            Debes estar logeado para comprar
          </label>
        </div>
      )}
      <Link to={"/"}>
        <button>
          {" "}
          <label>VolverAtras </label>
        </button>
      </Link>
    </div>
  );
}

export default Details;
