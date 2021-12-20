import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import ProductForm from "../../Components/ProductForm/ProductForm";
import {
  getItemById,
  updateProductDataById,
} from "../../services/productServices";
import "./Modificar_Producto.css";

function Modificar_Producto(props) {
  let history = useHistory();
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const isSuperUser = localStorage.getItem("isSuperUser");
  const userName = localStorage.getItem("userName");
  const token = localStorage.getItem("token");

  const [formData, setForm] = useState({
    photo: "",
    name: "",
    price: "",
    code: "",
    description: "",
    category: "",
  });

  const updateProductData = (e) => {
    e.preventDefault();
    if (Object.values(formData).indexOf("") > -1) {
      setErrorMessage("Debe llenar todos los campos");
      setSuccessMessage("")
    } else {
      try {
        updateProductDataById(
          props.match.params.id,
          userName,
          token,
          formData
        ).then((response) => {
          if (response.status !== "Error") {
            setSuccessMessage("Datos Actualizados");
            console.log(successMessage);
            setErrorMessage("");
          } else {
            setErrorMessage(response.message);
            setSuccessMessage("");
          }
        });
      } catch (e) {
        setErrorMessage(e.message);
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      if (isSuperUser) {
        try {
          getItemById(props.match.params.id).then((response) => {
            if (response.status !== "Error")
              setForm({
                ...formData,
                price: response.data.price,
                category: response.data.category,
                name: response.data.name,
                photo: response.data.photo,
                code: response.data.code,
                description: response.data.description,
              });
            else setErrorMessage(response.message);
          });
        } catch (e) {
          console.log("Error", e);
        }
      } else {
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
        onSubmit={updateProductData}
        form={{ formData: formData, setForm: setForm }}
        titleLabel={"Datos del Producto"}
        descriptionLabel={
          "Aquí puede modificar los datos. Una vez modificados haga click en Confirmar Modificaciones"
        }
        buttonLabel="Confirmar Modificacions"
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
    </>
  );
}

export default Modificar_Producto;
