import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./CartProduct.css";

function CartProduct(props) {
  const [isDeleted, setDeleted] = useState(false);
  const [quantity, setQuantity] = useState(Number(props.product.quantity));
  function handleQuantityChange(e) {
    setQuantity(e.target.value);
    props.changeProductQuantity(props.product.code, e.target.value);
  }

  function removeFromCart() {
    props.deleteProductFromCart(props.product.code);
    setDeleted(true);
  }

  if (props.product !== undefined && !isDeleted)
    return (
      <div className="cart-product-container">
        <img
          src={props.product.photo}
          alt="Error al Cargar"
          className="cart-product-container__image"
        />
        <div className="cart-product__description">
          <label>Nombre: {props.product.name}</label>
          <br />
          <label>Codigo: {props.product.code} </label>
          <br />
          <label>Precio: {props.product.price}</label>

          <br />
          <label>Categoria: {props.product.category}</label>
          <br />
          <label>Descripcion: {props.product.description}</label>
        </div>
        <div className="cart-product__options-container">
          <label>Cantidad: </label>
          <input
            type="number"
            onChange={handleQuantityChange}
            className="cart-product__change-quantity-input"
            value={quantity}
          ></input>
          <FontAwesomeIcon
            icon={faTimesCircle}
            className="cart-product-container__icon"
            onClick={removeFromCart}
            title="Remove from cart"
          />
        </div>
      </div>
    );
  else return null;
}

export default CartProduct;
