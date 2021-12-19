import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Product_Manage.css";

function Product_Manage(props) {
  if (props.item !== undefined)
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
        <FontAwesomeIcon
          icon={faPen}
          className="product_manage-container__icon"
        />
        <br />
        <label>Precio: {props.item.price}</label>

        <br />
        <label>Categoria: {props.item.category}</label>
        <FontAwesomeIcon
          icon={faTrash}
          className="product_manage-container__icon"
        />
      </div>
    );
  else return null;
}

export default Product_Manage;
