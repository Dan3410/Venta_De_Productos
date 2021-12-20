import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import ProductForm from "../../Components/ProductForm/ProductForm";
import { createProductById } from "../../services/productServices";
import "./Agregar_Producto.css";

function Agregar_Producto(props) {
  const [formData, setForm] = useState({
    photo: "",
    name: "",
    price: "",
    code: "",
    description: "",
    category: "",
  });

  let history = useHistory();
  const [errorMessage, setErrorMessage] = useState();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const isSuperUser = localStorage.getItem("isSuperUser");
  const userName = localStorage.getItem("userName");
  const token = localStorage.getItem("token");

  const uploadProductData = (e) => {
    e.preventDefault();
    if (Object.values(formData).indexOf("") > -1) {
      setErrorMessage("Debe llenar todos los campos");
    } else {
      try {
        console.log("Intenta modificar datos");
        createProductById(userName, token, formData).then((response) => {
          console.log(response);
          if (response.status !== "Error") {
            history.push("/Gestion_Productos");
            setErrorMessage("");
          } else {
            setErrorMessage(response.message);
          }
        });
      } catch (e) {
        setErrorMessage(e.message);
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      if (!isSuperUser) {
        history.push("/Home");
      }
    } else {
      history.push("/Login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ProductForm
        onSubmit={uploadProductData}
        form={{ formData: formData, setForm: setForm }}
        titleLabel={"Datos del Producto"}
        descriptionLabel={
          "Ingrese los datos del nuevo producto"
        }
        buttonLabel={"Agregar Producto"}

        errorMessage={errorMessage}
        successMessage={null}
      />
    </>
  );
}

export default Agregar_Producto;
