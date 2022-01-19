import { connect } from "react-redux";
import { deleteAllProducts } from "../../Config/redux/actions";
import Header from "./Header.jsx";

function mapDispatchToProps(dispatch) {
    return {
      deleteAllProductsFromCart: () => dispatch(deleteAllProducts()),
    };
  }
  
  const HeaderScreen = connect(null,mapDispatchToProps)(Header)
  
  export default HeaderScreen