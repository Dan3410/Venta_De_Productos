import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Product_Manage.css";


function Product_Manage(props) {

  const [isDeleted,setDeleted] = useState(false)

  function deleteItem(){
    props.deleteProduct(props.item._id)
    setDeleted(true);
  }

  if (props.item !== undefined && !isDeleted)
    return (
      <div className="product_manage-container">
        <img
          src={props.item.photo}
          alt="Error al Cargar"
          className="product_manage-container__image"
        />
        <label>Nombre: {props.item.name}</label>

        <br />
        <label>Codigo: {props.item.code} </label>
        <Link to={`/Modificar_Producto/${props.item._id}`}>
        <FontAwesomeIcon
          icon={faPen}
          className="product_manage-container__icon"
          title="Modify product data"
        />
        </Link>
        <br />
        <label>Precio: {props.item.price}</label>

        <br />
        <label>Categoria: {props.item.category}</label>
        <FontAwesomeIcon
          icon={faTrash}
          className="product_manage-container__icon"
          onClick={deleteItem}
          title="Erase product"
        />
      </div>
    );
  else return null;
}

export default Product_Manage;
