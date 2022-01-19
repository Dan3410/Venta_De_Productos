import "./App.css";
import Home from "./Pages/Home/Home.jsx";
import Register from "./Pages/Register/Register.jsx";
import Login from "./Pages/Login/Login.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import { Redirect, Route, Switch } from "react-router";
import { withRouter } from "react-router";
import LoggedInRoute from "./Components/ProtectedRoutes/LoggedInRoute.jsx";
import SuperUserRoute from "./Components/ProtectedRoutes/SuperUserRoute.jsx";
import NotLoggedInRoute from "./Components/ProtectedRoutes/NotLoggedInRoute.jsx";
import ProductsManager from "./Pages/ProductManager/ProductsManager.jsx";
import ProductModifier from "./Pages/ModifyProduct/ModifyProduct.jsx";
import ProductAdder from "./Pages/ProductAdder/ProductAdder.jsx";
import ProductDetailScreen from "./Pages/ProductDetails/ProductDetails.js";
import CartScreen from "./Pages/Cart/Cart.js";
import HeaderScreen from "./Components/Header/Header.js";

const exclusionPaths = ["/Login", "/Register"];

function App({ location }) {
  return (
    <div>
      {exclusionPaths.indexOf(location.pathname) < 0 && <HeaderScreen />}
      <Switch>
        <Route exact path="/ProductDetail/:id" component={ProductDetailScreen} />
        <Route exact path="/" component={Home} />
        <NotLoggedInRoute exact path="/Register" component={Register} />
        <NotLoggedInRoute exact path="/Login" component={Login} />
        <LoggedInRoute exact path="/Profile/:username" component={Profile} />
        <LoggedInRoute exact path="/Cart/:username" component={CartScreen} />
        <SuperUserRoute
          exact
          path="/Gestion_Productos"
          component={ProductsManager}
        />
        <SuperUserRoute
          exact
          path="/Modificar_Producto/:id"
          component={ProductModifier}
        />
        <SuperUserRoute
          exact
          path="/Agregar_Producto/"
          component={ProductAdder}
        />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default withRouter(App);
