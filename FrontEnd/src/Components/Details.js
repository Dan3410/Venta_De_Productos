import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './Details.css'
import userContext from '../Config/context'
import { getItemById } from '../services/productServices'

function Details(props) {
  const [itemData, setData] = useState([])
  const [text, setText] = useState([]);

  function handlePurchase(event) {
    setText('Gracias Por Su Compra')
    event.preventDefault();
    event.stopPropagation();
  }

  useEffect(() => {

    const getItem = async () => {
      try {
        getItemById(props.idItemAMostrar).then(product=>{
          setData(product)})
      }
      catch (e) {
        console.log("Error", e)
      }
    }

    getItem()
  }, [props.idItemAMostrar])

  return (
    <userContext.Consumer>{context => (
      <div className='DetailsDiv'>
        <img className="DetailsImage" src={itemData.photo} alt="error loading" />
        <h2 className="DetailsName"> Nombre del producto: {itemData.name}</h2>
        <div>Descripcion: {itemData.description}</div>
        <div className="DetailsPrice">Precio: {itemData.price}</div>
        <div> SKU: {itemData.code}</div>
        <div> {text} </div>
        {context.isLoggedIn && <button onClick={handlePurchase}> Comprar </button>}
        {!context.isLoggedIn && <div > Debes estar logeado para comprar </div>}
        <Link to={'/'}><button> VolverAtras </button></Link>
      </div>
    )}</userContext.Consumer>
  )
}

export default Details;