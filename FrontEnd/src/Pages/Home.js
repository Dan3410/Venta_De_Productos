import Producto from "../Components/Producto";
import "./Home.css";
import { useEffect, useState } from "react";
import { getAllItems } from "../services/productServices";

function Home() {
  const [items, setItem] = useState([]);
  const getItems = async () => {
    try {
      getAllItems().then((response) => {
        setItem(response.data);
      });
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  useEffect(() => {
    getItems();
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
            <Producto key={index} itemAMostrar={item} />
          ))}
        </div>
      </div>
  );
}

export default Home;
