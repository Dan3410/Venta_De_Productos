import { connect } from "react-redux";
import { changeQuantity, decreaseQuantityByOne, deleteProduct, increaseQuantityByOne } from "../../Config/Redux/Actions/cartActions";
import Cart from "./Cart.jsx";

function mapStateToProps(state) {
    return {
      productsInCart: state.cart.products
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      deleteProductFromCart: (productCode) => dispatch(deleteProduct(productCode)),
      increaseProductQuantityByOne: (productCode) => dispatch(increaseQuantityByOne(productCode)),
      decreaseProductQuantityByOne: (productCode) => dispatch(decreaseQuantityByOne(productCode)),
      changeProductQuantity: (productCode,quantity) => dispatch(changeQuantity(productCode,quantity))
    };
  }
  
  const CartScreen = connect(mapStateToProps,mapDispatchToProps)(Cart)
  
  export default CartScreen