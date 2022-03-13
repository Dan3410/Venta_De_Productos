import "./Home.scss";
import { useEffect, useState } from "react";
import { getItems } from "../../Functions/productsFunctions";
import ProductDisplay from "../../Components/ProductDisplay/ProductDIsplay.jsx";

function Home() {
  const [items, setItem] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getItems(setItem,setErrorMessage);
  }, []);

  return (
    <div className="home-page">
      <div>
        <div className="home__title-container">
          <label className="home__title-container__text">Productos</label>
        </div>
      </div>
      <div className="home__products-showroom">
        {items.map((item, index) => (
          <ProductDisplay key={index} itemAMostrar={item} />
        ))}
      </div>
      <div className="home__message-container">
        <label className="home__message-container__text--error">
          {errorMessage}
        </label>
      </div>
    </div>
  );
}

export default Home;
