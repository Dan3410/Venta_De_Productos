import { connect } from "react-redux";
import ProductAdder from "./ProductAdder.jsx";

function mapStateToProps(state) {
  return {
    username: state.userData.username,
    token: state.userData.token
  };
}

const ProductAdderScreen = connect(mapStateToProps, null)(ProductAdder);

export default ProductAdderScreen;
