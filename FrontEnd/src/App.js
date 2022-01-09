import "./App.css";
import Home from "./Pages/Home/Home.js";
import Register from "./Pages/Register/Register.js";
import Login from "./Pages/Login/Login.js";
import ProductDetail from "./Pages/ProductDetails/ProductDetails.js";
import Profile from "./Pages/Profile/Profile.js";
import Header from "./Components/Header/Header.js";
import { Redirect, Route, Switch } from "react-router";
import { withRouter } from "react-router";
import LoggedInRoute from "./Components/ProtectedRoutes/LoggedInRoute";
import SuperUserRoute from "./Components/ProtectedRoutes/SuperUserRoute";
import NotLoggedInRoute from "./Components/ProtectedRoutes/NotLoggedInRoute";
import ProductsManager from "./Pages/ProductManager/ProductsManager";
import ProductModifier from "./Pages/ModifyProduct/ModifyProduct";
import ProductAdder from "./Pages/ProductAdder/ProductAdder";

const exclusionPaths = ["/Login", "/Register"];

function App({ location }) {
  return (
    <div>
      {exclusionPaths.indexOf(location.pathname) < 0 && <Header />}
      <Switch>
        <Route exact path="/ProductDetail/:id" component={ProductDetail} />
        <Route exact path="/" component={Home} />
        <NotLoggedInRoute exact path="/Register" component={Register} />
        <NotLoggedInRoute exact path="/Login" component={Login} />
        <LoggedInRoute exact path="/Profile/:username" component={Profile} />
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
