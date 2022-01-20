import { connect } from "react-redux";
import SuperUser from "./SuperUserRoute.jsx";

function mapStateToProps(state) {
    return {
        token: state.userData.token,
        isLoggedIn: state.userData.isLoggedIn
    };
  }
  
  const SuperUserRoute = connect(mapStateToProps,null)(SuperUser)
  
  export default SuperUserRoute