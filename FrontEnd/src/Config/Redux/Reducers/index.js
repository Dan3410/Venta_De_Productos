import { combineReducers } from "redux";
import userData from "./userDataReducers";
import cart from "./cartReducers";

export const reducer = combineReducers({
    userData,
    cart
})
