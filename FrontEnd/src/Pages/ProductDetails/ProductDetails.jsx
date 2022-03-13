import { CSSTransition } from "react-transition-group";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Details from "../../Components/Details/Details.jsx";
import { getItemById } from "../../api/productApi.js";
import "./ProductDetails.scss";

function ProductDetail(props) {
  const [productData, setProductData] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [productInCart, setProductInCart] = useState(false);
  const [quantityProduct, setQuantity] = useState(Number(0));
  const isLoggedIn = props.isLoggedIn;

  const getItem = async () => {
    getItemById(props.match.params.id).then((response) => {
      if (response.status === 200) setProductData(response.product);
      if (response.status === 404) throw new Error("Product not found");
      if (response.status === 500) throw new Error("Error retrieving product");
    });
  };

  useEffect(() => {
    getItem().then(() => {
      if (!isLoggedIn) {
        setWarningMessage(
          "Debes estar logeado para agregar productos al carro"
        );
      } else {
        if (
          props.productsInCart.find(
            (product) => product.code === productData.code
          )
        ) {
          setProductInCart(true);
          if (successMessage !== "Agregado al carro")
            setWarningMessage("El producto ya esta en el carro.");
        }
      }
    },(error) => setWarningMessage(error.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      props.addProductToCart(productData, Number(quantityProduct));
      event.preventDefault();
      event.stopPropagation();
    }
    console.log(props.isLoggedIn);
  }

  return (
    <CSSTransition
      in
      classNames="appear"
      appear={true}
      unmountOnExit={true}
      timeout={500}
    >
      <div className="product-details-container">
        <Details
          productsInCart={props.productsInCart}
          addProductToCart={props.addProductToCart}
          checkProductInCart={props.checkProductInCart}
          product={productData}
        ></Details>
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
              <button onClick={handlePurchase} className="button">
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
    </CSSTransition>
  );
}

export default ProductDetail;
