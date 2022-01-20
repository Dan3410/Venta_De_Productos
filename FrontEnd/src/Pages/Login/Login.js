import { connect } from "react-redux";
import { loadUserData } from "../../Config/Redux/Actions/userDataActions";
import Login from "./Login.jsx";

function mapDispatchToProp (dispatch){
    return {loadUserData: (username,token,name) => dispatch(loadUserData(username,token,name))}
}

const LoginScreen = connect(null, mapDispatchToProp) (Login);

export default LoginScreen