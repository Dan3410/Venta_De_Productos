import "./Details.scss";

function Details(props) {
  const product = props.product;

  return (
    <div className="product-details-container">
      <img
        className="product-details-container__image"
        src={product.photo}
        alt="error loading"
      />
      <h2>
        <label> {product.name}</label>
      </h2>
      <div>
        <label>Descripcion: {product.description}</label>
      </div>
      <div className="product-details-container__price">
        <label>Precio: {product.price}</label>
      </div>
      <div>
        <label>SKU: {product.code}</label>
      </div>
    </div>
  );
}

export default Details;
