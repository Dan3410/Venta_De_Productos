import "./App.css"
import Home from "./Pages/Home.js";
import Register from "./Pages/Register.js";
import Login from "./Pages/Login.js";
import ProductDetail from "./Pages/ProductDetails.js";
import Profile from "./Pages/Profile.js";
import Header from "./Components/Header.js";
import { Route } from "react-router";
import GlobalContext from "./Config/globalContext";
import {withRouter} from 'react-router'

const exclusionPaths = [
  '/Login',
  '/Register'
]

function App({location}) {
  return (
    <GlobalContext>
            {exclusionPaths.indexOf(location.pathname) < 0 && <Header/>}
            <Route exact path="/Register" component={Register} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/" component={Home} />
            <Route exact path="/ProductDetail/:id" component={ProductDetail} />
            <Route exact path="/Profile/:userName" component={Profile} />
    </GlobalContext>
  );
}

export default withRouter(App);
