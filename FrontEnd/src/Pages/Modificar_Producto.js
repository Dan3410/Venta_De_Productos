import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import AlignedFields from "../Components/AlignedFields";
import FormField from "../Components/FormField";
import FormSubmit from "../Components/FormSubmit";
import ResizableFormField from "../Components/ResizableFormField";
import {
  getItemById,
  updateProductDataById,
} from "../services/productServices";
import "./Modificar_Producto.css";

function Modificar_Producto(props) {
  const [form, setForm] = useState({
    photo: "",
    name: "",
    price: "",
    code: "",
    description: "",
    category: "",
  });

  const photoField = {
    name: "photo",
    label: "Url de la Foto: ",
    value: form.photo,
    placeholder: "Introduzca el URL a la foto",
    disabled: false,
    type: "text",
  };

  const nameField = {
    name: "name",
    label: "Nombre del producto: ",
    value: form.name,
    placeholder: "Introduzca el nombre",
    disabled: false,
    type: "text",
  };
  const priceField = {
    name: "price",
    label: "Precio del producto: ",
    value: form.price,
    placeholder: "Introduzca el precio",
    disabled: false,
    type: "text",
  };
  const codeField = {
    name: "code",
    label: "Codigo del producto: ",
    value: form.code,
    placeholder: "Introduzca el codigo",
    disabled: false,
    type: "text",
  };

  const descriptionField = {
    name: "description",
    label: "Descripción del producto: ",
    value: form.description,
    placeholder: "Describa el producto",
    disabled: false,
    type: "text",
  };

  const categoryField = {
    name: "category",
    label: "Categoria del producto: ",
    value: form.category,
    placeholder: "Introduzca la categoria",
    disabled: false,
    type: "text",
  };

  let history = useHistory();
  const [errorMessage, setErrorMessage] = useState();
  const [changeMessage, setChangeMessage] = useState();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const isSuperUser = localStorage.getItem("isSuperUser");
  const userName = localStorage.getItem("userName");
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const updateProductData = (e) => {
    e.preventDefault();
    if (Object.values(form).indexOf("") > -1) {
      setErrorMessage("Debe llenar todos los campos");
    } else {
      try {
        console.log("Intenta modificar datos")
        updateProductDataById(props.match.params.id, userName, token,form).then(
          (response) => {
            console.log(response)
            if (response.status !== "Error"){
              setChangeMessage("Datos Actualizados");
              setErrorMessage("")
            }
            else{
              setErrorMessage(response.message)
              setChangeMessage("")
            }
          }
        );
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
                ...form,
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
    <div className="modificar-producto-page">
      <div className="modificar-producto-form--center ">
        <form
          onSubmit={updateProductData}
          className="modificar-producto-form--format"
        >
          <div className="modificar-producto-form__title-container">
            <label className="modificar-producto-form__title-container__text">
              Datos del Producto
            </label>
          </div>
          <br />
          <label>
            Aquí puede modificar los datos. Una vez modificados haga click en
            Confirmar Modificaciones
          </label>
          <br />
          <div className="modificar-producto-form__image-container">
            <img
              src={form.photo}
              alt="ERROR AL CARGAR LA FOTO"
              className="modificar-producto-form__image"
            />
          </div>
          <AlignedFields
            firstField={nameField}
            secondField={codeField}
            handleChange={handleChange}
          />
          <AlignedFields
            firstField={categoryField}
            secondField={priceField}
            handleChange={handleChange}
          />

          <FormField field={photoField} handleChange={handleChange} />

          <ResizableFormField
            field={descriptionField}
            handleChange={handleChange}
          />
          <FormSubmit value="Confirmar Modificaciones"></FormSubmit>
          <div className="modificar-producto-form__message-container">
            <label className="modificar-producto-form__message-container__text--error">
              {errorMessage}
            </label>
          </div>
          <div className="modificar-producto-form__message-container">
            <label className="modificar-producto-form__message-container__text--success">
              {changeMessage}
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modificar_Producto;
