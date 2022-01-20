import { connect } from "react-redux";
import { changeName } from "../../Config/Redux/Actions/userDataActions";
import Profile from "./Profile.jsx";

function mapStateToProps(state) {
  return {
    token: state.userData.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeNameUserData: (name) => dispatch(changeName(name)),
  };
}

const ProfileScreen = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default ProfileScreen;
