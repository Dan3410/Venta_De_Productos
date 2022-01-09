import "./Home.css";
import { useEffect, useState } from "react";
import { getItems } from "../../Functions/productsFunctions";
import ProductDisplay from "../../Components/ProductDisplay/ProductDIsplay";

function Home() {
  const [items, setItem] = useState([]);

  useEffect(() => {
    getItems(setItem);
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
    </div>
  );
}

export default Home;
