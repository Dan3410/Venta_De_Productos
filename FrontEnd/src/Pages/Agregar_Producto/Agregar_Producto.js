import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import ProductForm from "../../Components/ProductForm/ProductForm";
import { getIsLoggedIn, getToken, getUsername } from "../../Config/LocalStorage";
import { getPrivilege } from "../../Functions/userFunctions";
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
  const username = getUsername();
  const token = getToken();
  const isLoggedIn = getIsLoggedIn();
  const isSuperUser = getPrivilege(username, token);

  const uploadProductData = (e) => {
    e.preventDefault();
    if (Object.values(formData).indexOf("") > -1) {
      setErrorMessage("Debe llenar todos los campos");
    } else {
      try {
        createProductById(username, token, formData).then((response) => {
          if (response.status !== "Error") {
            history.push("/Gestion_Productos");
            setErrorMessage("");
          } else {
            throw new Error(response.message);
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
        history.push("");
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
        descriptionLabel={"Ingrese los datos del nuevo producto"}
        buttonLabel={"Agregar Producto"}
        errorMessage={errorMessage}
        successMessage={null}
      />
    </>
  );
}

export default Agregar_Producto;
