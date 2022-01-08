import "./App.css";
import Home from "./Pages/Home/Home.js";
import Register from "./Pages/Register/Register.js";
import Login from "./Pages/Login/Login.js";
import ProductDetail from "./Pages/ProductDetails/ProductDetails.js";
import Profile from "./Pages/Profile/Profile.js";
import Gestion_Productos from "./Pages/Gestion_Producto/Gestion_Productos.js";
import Modificar_Producto from "./Pages/Modificar_Producto/Modificar_Producto.js";
import Agregar_Producto from "./Pages/Agregar_Producto/Agregar_Producto.js";
import Header from "./Components/Header/Header.js";
import { Redirect, Route, Switch } from "react-router";
import { withRouter } from "react-router";
import LoggedInRoute from "./Components/ProtectedRoutes/LoggedInRoute";
import SuperUserRoute from "./Components/ProtectedRoutes/SuperUserRoute";

const exclusionPaths = ["/Login", "/Register"];

function App({ location }) {
  return (
    <div>
      {exclusionPaths.indexOf(location.pathname) < 0 && <Header />}
      <Switch>
        <Route exact path="/Register" component={Register} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/ProductDetail/:id" component={ProductDetail} />
        <Route exact path="/" component={Home} />
        <LoggedInRoute exact path="/Profile/:username" component={Profile} />
        <SuperUserRoute exact path="/Gestion_Productos" component={Gestion_Productos} />
        <SuperUserRoute
          exact
          path="/Modificar_Producto/:id"
          component={Modificar_Producto}
        />
        <SuperUserRoute exact path="/Agregar_Producto/" component={Agregar_Producto} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default withRouter(App);
