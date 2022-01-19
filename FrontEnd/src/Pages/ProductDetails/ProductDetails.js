import { connect } from "react-redux";
import { addProduct } from "../../Config/redux/actions";
import ProductDetail from "./ProductDetails.jsx";

function mapStateToProps(state) {
  return {
    productsInCart: state.products
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addProductToCart: (product,quantity) => dispatch(addProduct(product,quantity))
  };
}

const ProductDetailScreen = connect(mapStateToProps,mapDispatchToProps)(ProductDetail)

export default ProductDetailScreen