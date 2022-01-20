import { connect } from "react-redux";
import { addProduct } from "../../Config/Redux/Actions/cartActions";
import ProductDetail from "./ProductDetails.jsx";

function mapStateToProps(state) {
  return {
    productsInCart: state.cart.products,
    isLoggedIn: state.userData.isLoggedIn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addProductToCart: (product,quantity) => dispatch(addProduct(product,quantity))
  };
}

const ProductDetailScreen = connect(mapStateToProps,mapDispatchToProps)(ProductDetail)

export default ProductDetailScreen