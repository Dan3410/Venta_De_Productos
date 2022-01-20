import { connect } from "react-redux";
import NotLoggedIn from "./NotLoggedInRoute.jsx";

function mapStateToProps(state) {
  return {
    isLoggedIn: state.userData.isLoggedIn,
  };
}

const NotLoggedInRoute = connect(mapStateToProps,null)(NotLoggedIn);

export default NotLoggedInRoute;
