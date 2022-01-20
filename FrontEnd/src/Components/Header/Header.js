import { connect } from "react-redux";
import { deleteAllProducts } from "../../Config/Redux/Actions/cartActions";
import { deleteUserData } from "../../Config/Redux/Actions/userDataActions";
import Header from "./Header.jsx";

function mapStateToProps(state){
  return {isLoggedIn: state.userData.isLoggedIn,
  name: state.userData.name,
  token: state.userData.token,
  username: state.userData.username}
}

function mapDispatchToProps(dispatch) {
    return {
      deleteAllProductsFromCart: () => dispatch(deleteAllProducts()),
      deleteUserData: () => dispatch(deleteUserData())
    };
  }
  
  const HeaderScreen = connect(mapStateToProps,mapDispatchToProps)(Header)
  
  export default HeaderScreen