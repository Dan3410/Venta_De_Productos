import Details from "../../Components/Details/Details.jsx";
import "./ProductDetails.scss";

function ProductDetail(props) {
  return (
    <Details
      idItemAMostrar={props.match.params.id}
      productsInCart={props.productsInCart}
      addProductToCart={props.addProductToCart}
      checkProductInCart={props.checkProductInCart}
      isLoggedIn={props.isLoggedIn}
    ></Details>
  );
}

export default ProductDetail;
