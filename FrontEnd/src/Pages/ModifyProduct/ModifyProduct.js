import { connect } from "react-redux";
import ModifyProduct from "./ModifyProduct.jsx";

function mapStateToProps(state) {
  return {
    username: state.userData.username,
    token: state.userData.token
  };
}

const ModifyProductScreen = connect(mapStateToProps, null)(ModifyProduct);

export default ModifyProductScreen;
