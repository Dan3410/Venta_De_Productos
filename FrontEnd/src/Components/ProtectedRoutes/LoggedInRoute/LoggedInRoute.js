import { connect } from "react-redux";
import LoggedIn from "./LoggedInRoute.jsx";

function mapStateToProps(state) {
    return {
        username: state.userData.username,
        isLoggedIn: state.userData.isLoggedIn
    };
  }
  
  const LoggedInRoute = connect(mapStateToProps,null)(LoggedIn)
  
  export default LoggedInRoute