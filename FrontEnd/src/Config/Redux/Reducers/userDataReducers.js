import {
  CHANGE_NAME,
  DELETE_USER_DATA,
  LOAD_USER_DATA,
} from "../ActionsType/userDataActionsType";

const initialState = {
  isLoggedIn: false,
  username: null,
  token: null,
  name: null,
};

function loadUserData(username, name, token) {
  return { isLoggedIn: true, username: username, name: name, token: token };
}

function changeName(userData, name) {
  return { ...userData, name: name };
}

function userData(state = initialState, action) {
  switch (action.type) {
    case DELETE_USER_DATA:
      console.log(DELETE_USER_DATA)
      return initialState;
    case LOAD_USER_DATA:
      return loadUserData(action.username, action.name, action.token);
    case CHANGE_NAME:
      return changeName(state, action.name);
    default:
      return state;
  }
}

export default userData;
