import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import ProductForm from "../../Components/ProductForm/ProductForm";
import { getIsLoggedIn, getToken, getUsername } from "../../Config/LocalStorage";
import { getPrivilege } from "../../Functions/userFunctions";
import {
  getItemById,
  updateProductDataById,
} from "../../services/productServices";
import "./Modificar_Producto.css";

function Modificar_Producto(props) {
  let history = useHistory();

  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const username = getUsername();
  const token = getToken();
  const isLoggedIn = getIsLoggedIn();
  const isSuperUser = getPrivilege(username, token);

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
      setSuccessMessage("");
    } else {
      try {
        updateProductDataById(
          props.match.params.id,
          username,
          token,
          formData
        ).then((response) => {
          if (response.status !== "Error") {
            setSuccessMessage("Datos Actualizados");
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
            else throw new Error (response.message);
          });
        } catch (e) {
          setErrorMessage(e.message);
        }
      } else {
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
