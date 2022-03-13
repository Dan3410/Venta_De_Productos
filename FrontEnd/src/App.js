import "./App.css";
import Home from "./Pages/Home/Home.jsx";
import Register from "./Pages/Register/Register.jsx";
import { Redirect, Route, Switch } from "react-router";
import { withRouter } from "react-router";
import ProductDetailScreen from "./Pages/ProductDetails/ProductDetails.js";
import CartScreen from "./Pages/Cart/Cart.js";
import HeaderScreen from "./Components/Header/Header.js";
import LoginScreen from "./Pages/Login/Login.js";
import ProfileScreen from "./Pages/Profile/Profile.js";
import LoggedInRoute from "./Components/ProtectedRoutes/LoggedInRoute/LoggedInRoute.js";
import NotLoggedInRoute from "./Components/ProtectedRoutes/NotLoggedInRoute/NotLoggedInRoute.js";
import SuperUserRoute from "./Components/ProtectedRoutes/SuperUserRoute/SuperUserRoute.js"
import ProductsManagerScreen from "./Pages/ProductManager/ProductsManager.js";
import ProductAdderScreen from "./Pages/ProductAdder/ProductAdder.js";
import ModifyProductScreen from "./Pages/ModifyProduct/ModifyProduct.js";

//const exclusionPaths = ["/Login", "/Register"];

function App({ location }) {
  return (
    <div>
      {/*exclusionPaths.indexOf(location.pathname) < 0 && */<HeaderScreen />}
      <Switch>
        <Route exact path="/ProductDetail/:id" component={ProductDetailScreen} />
        <Route exact path="/" component={Home} />
        <NotLoggedInRoute exact path="/Register" component={Register} />
        <NotLoggedInRoute exact path="/Login" component={LoginScreen} />
        <LoggedInRoute exact path="/Profile/:username" component={ProfileScreen} />
        <LoggedInRoute exact path="/Cart/:username" component={CartScreen} />
        <SuperUserRoute
          exact
          path="/Gestion_Productos"
          component={ProductsManagerScreen}
        />
        <SuperUserRoute
          exact
          path="/Modificar_Producto/:id"
          component={ModifyProductScreen}
        />
        <SuperUserRoute
          exact
          path="/Agregar_Producto/"
          component={ProductAdderScreen}
        />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default withRouter(App);
