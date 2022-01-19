import Details from "../../Components/Details/Details.jsx";
import "./ProductDetails.css";

function ProductDetail(props) {
  return (
    <Details
      idItemAMostrar={props.match.params.id}
      productsInCart={props.productsInCart}
      addProductToCart={props.addProductToCart}
      checkProductInCart={props.checkProductInCart}
    ></Details>
  );
}

export default ProductDetail;
