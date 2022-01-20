import { connect } from "react-redux";
import ProductsManager from "./ProductsManager.jsx";

function mapStateToProps(state) {
  return {
    username: state.userData.username,
    token: state.userData.token
  };
}

const ProductsManagerScreen = connect(mapStateToProps, null)(ProductsManager);

export default ProductsManagerScreen;
