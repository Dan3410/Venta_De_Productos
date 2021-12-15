import Producto from "../Components/Producto";
import "./Home.css";
import { useEffect, useState } from "react";
import { getAllItems } from "../services/productServices";


function Home() {
  const [items, setItem] = useState([]);
  const getItems = async () => {
    try {
      getAllItems().then( products=>{
      setItem(products)})
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
      <div className="home">
        <div>
          <div className="titleDiv ">Productos</div>
        </div>
        <div className="chairDisplay">
          {items.map((item,index) => (
            <Producto key={index} itemAMostrar={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
