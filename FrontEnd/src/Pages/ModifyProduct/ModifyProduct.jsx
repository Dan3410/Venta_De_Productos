import { useState, useEffect } from "react";
import ProductForm from "../../Components/ProductForm/ProductForm.jsx";
import { getItemById, updateProductDataById } from "../../api/productApi";
import "./ModifyProduct.scss";

function ProductModifier(props) {
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const username = props.username;
  const token = props.token;

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
          if (response.status === 200) {
            setSuccessMessage("Data updated!");
            setErrorMessage("");
          }
          if (response.status === 401) {
            setErrorMessage("You dont have the privilege to do that");
            setSuccessMessage("");
          }
          if (response.status === 500) {
            setErrorMessage("Error updating data");
            setSuccessMessage("");
          }
        });
      } catch (e) {
        setErrorMessage(e.message);
      }
    }
  };

  useEffect(() => {
    try {
      getItemById(props.match.params.id).then((response) => {
        if (response.status === 200) {
          console.log(response);
          setForm({
            ...formData,
            price: response.product.price,
            category: response.product.category,
            name: response.product.name,
            photo: response.product.photo,
            code: response.product.code,
            description: response.product.description,
          });
        } else setErrorMessage("Error retrieving product data");
      });
    } catch (e) {
      setErrorMessage(e.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="product-form-page">
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
    </div>
  );
}

export default ProductModifier;
