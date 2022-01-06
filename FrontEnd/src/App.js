import "./App.css";
import Home from "./Pages/Home/Home.js";
import Register from "./Pages/Register/Register.js";
import Login from "./Pages/Login/Login.js";
import ProductDetail from "./Pages/ProductDetails/ProductDetails.js";
import Profile from "./Pages/Profile/Profile.js";
import Gestion_Productos from "./Pages/Gestion_Producto/Gestion_Productos.js"
import Modificar_Producto from "./Pages/Modificar_Producto/Modificar_Producto.js";
import Agregar_Producto from "./Pages/Agregar_Producto/Agregar_Producto.js"
import Header from "./Components/Header/Header.js";
import { Redirect, Route } from "react-router";
import { withRouter } from "react-router";


const exclusionPaths = ["/Login", "/Register"];

function App({ location }) {
  return (
    <div>
      {exclusionPaths.indexOf(location.pathname) < 0 && <Header />}
      <Route exact path="/Register" component={Register} />
      <Route exact path="/Login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route exact path="/Gestion_Productos" component={Gestion_Productos} />
      <Route exact path="/Modificar_Producto/:id" component={Modificar_Producto} />
      <Route exact path="/Agregar_Producto/" component={Agregar_Producto}/>
      <Route exact path="/ProductDetail/:id" component={ProductDetail} />
      <Route exact path="/Profile/:userName" component={Profile} />
      <Redirect to="/"/>
    </div>
  );
}

export default withRouter(App);
