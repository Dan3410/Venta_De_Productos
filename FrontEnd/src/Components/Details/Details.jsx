import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Details.scss";
import { getItemById } from "../../services/productServices";

function Details(props) {
  const [itemData, setData] = useState([]);
  const [productInCart, setProductInCart] = useState(false);
  const [quantityProduct, setQuantity] = useState(Number(0));
  const [warningMessage, setWarningMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const isLoggedIn = props.isLoggedIn;

  function handleChange(event) {
    if (event.target.value < 0) setQuantity(1);
    else setQuantity(event.target.value);
  }

  function handlePurchase(event) {
    if (quantityProduct < 1) {
      /*Esta rama del if no tendria que ocurrir ya que si se ingresa 
      una cantidad menor a 1, se setea en 1.
      */
      setSuccessMessage("");
      setWarningMessage("La cantidad debe ser mayor o igual a 1");
    } else {
      setSuccessMessage("Agregado al carro");
      setWarningMessage("");
      props.addProductToCart(itemData, Number(quantityProduct));
      event.preventDefault();
      event.stopPropagation();
    }
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
    if (!isLoggedIn) {
      setWarningMessage("Debes estar logeado para agregar productos al carro")
    } else {
      console.log(props.productsInCart)
      console.log(itemData.code)
      if (props.productsInCart.find(product => product.code === itemData.code)) {
        setProductInCart(true);
        if(successMessage !== "Agregado al carro")
          setWarningMessage("El producto ya esta en el carro.");
      }
    }
  }, [props.idItemAMostrar, itemData.code, isLoggedIn, props, successMessage]);

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
      <div className="product-details-container__added-To-Cart-message">
        <label>{successMessage}</label>
      </div>
      <div className="product-details-container__warning-message">
        <label>{warningMessage}</label>
      </div>

      {isLoggedIn && !productInCart && (
        <>
          <label>Ingrese la cantidad: </label>
          <input
            type="number"
            value={quantityProduct}
            onChange={handleChange}
          />
          <div>
            <button
              onClick={handlePurchase}
              className="button"
            >
              <label> Comprar </label>
            </button>
          </div>
        </>
      )}
      <Link to={"/"}>
        <button className="button">
          <label>VolverAtras </label>
        </button>
      </Link>
    </div>
  );
}

export default Details;
