import React from "react"
import { Link } from 'react-router-dom'
import './Producto.css'
//Definicion de clase
function Producto(props) {
    return (
        <div className="Product">
            <img className="ProductImage" src={props.itemAMostrar.photo} alt="error loading" />
            <div className="ProductName">Nombre del producto: {props.itemAMostrar.name}</div>
            <div>Precio: {props.itemAMostrar.price}</div>
            <div>Sku:{props.itemAMostrar.code}</div>
                <Link to={'/ProductDetail/' + props.itemAMostrar._id + '/'}><button>
                Ver Detalle</button></Link>
        </div>
    )
}

export default Producto;