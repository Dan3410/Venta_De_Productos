import { useState, } from "react";
import { useHistory } from "react-router";
import ProductForm from "../../Components/ProductForm/ProductForm";
import { getToken, getUsername } from "../../Config/LocalStorage/LocalStorage";
import { createProduct } from "../../services/productServices";
import "./ProductAdder.css";

function ProductAdder(props) {
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

  const uploadProductData = (e) => {
    e.preventDefault();
    if (Object.values(formData).indexOf("") > -1) {
      setErrorMessage("Debe llenar todos los campos");
    } else {
      try {
        createProduct(username, token, formData).then((response) => {
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

export default ProductAdder;
