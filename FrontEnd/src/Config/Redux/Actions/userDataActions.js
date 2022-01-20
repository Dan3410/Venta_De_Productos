import { CHANGE_NAME, DELETE_USER_DATA, LOAD_USER_DATA } from "../ActionsType/userDataActionsType";

export function deleteUserData() {
  return { type: DELETE_USER_DATA };
}

export function loadUserData(username, token, name) {
  return { type: LOAD_USER_DATA, username: username, token: token, name: name };
}

export function changeName(name){
  return { type: CHANGE_NAME, name:name}
}