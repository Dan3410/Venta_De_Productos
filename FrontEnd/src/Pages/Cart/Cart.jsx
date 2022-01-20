import CartProduct from "../../Components/CartProduct/CartProduct.jsx";
import "./Cart.scss"

function Cart(props) {
  if (props.productsInCart.length !== 0)
    return (
      <>
        {props.productsInCart.map((product, index) => (
          <CartProduct
            product={product}
            key={index}
            deleteProductFromCart={props.deleteProductFromCart}
            changeProductQuantity={props.changeProductQuantity}
          />
        ))}
      </>
    );
  else
    return (<div className="cart__empty-cart"><label>No hay nada en el carro</label></div>);
}

export default Cart;
