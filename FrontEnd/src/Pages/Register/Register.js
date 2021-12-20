import { useState } from "react";
import { useHistory } from "react-router";
import "./Register.css";
import { createUserWithUserNameAndPassword } from "../../services/userServices";
import FormSubmit from "../../Components/FormSubmit/FormSubmit";
import AlignedFields from "../../Components/AlignedFields/AlignedFields";
import FormSecretField from "../../Components/FormSecretField/FormSecretField";

function Register(props) {
  let history = useHistory();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mail: "",
    userName: "",
    accountType: "Cuenta común",
    password: "",
    confirmPassword: "",
  });

  const firstNameField = {
    name: "firstName",
    label: "Nombre: ",
    value: form.firstName,
    placeholder: "Introduzca su nombre",
    type: "text",
    disabled: false,
  };
  const lastNameField = {
    name: "lastName",
    label: "Apellido: ",
    value: form.lastName,
    placeholder: "Introduzca su apellido",
    type: "text",
    disabled: false,
  };

  const userNameField = {
    name: "userName",
    label: "UserName:",
    value: form.userName,
    placeholder: "Introduzca el UserName",
    type: "text",
    disabled: false,
  };

  const mailField = {
    name: "mail",
    label: "Mail: ",
    value: form.mail,
    placeholder: "Introduzca su mail",
    type: "text",
    disabled: false,
  };
  const passwordFields = [
    {
      name: "password",
      label: "Password:",
      value: form.password,
      placeholder: "Introduza la contraseña",
      type: "password",
      disabled: false,
    },
    {
      name: "confirmPassword",
      label: "Confirmar Contraseña:",
      value: form.confirmPassword,
      placeholder: "Reintroduzca la contraseña",
      type: "password",
      disabled: false,
    },
  ];

  const options = [
    {
      label: "Cuenta común",
      value: "Cuenta común",
    },
    {
      label: "Cuenta Empresarial",
      value: "Cuenta Empresarial",
    },
  ];

  const [errorMessage, setErrorMessage] = useState();

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let password = form.password;
    let confirmpassword = form.confirmPassword;
    if (Object.values(form).indexOf("") > -1) {
      setErrorMessage("Debe llenar todos los campos");
    } else if (password !== confirmpassword) {
      setErrorMessage(
        "El valor ingresado en contraseña y confirmar contraseña deben ser iguales"
      );
    } else if (password.length < 6) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres");
    } else if (password.length > 14) {
      setErrorMessage("La contraseña debe tener menos de 15 caracteres");
    } else {
      let mail = form.mail;
      let userName = form.userName;
      let firstName = form.firstName;
      let lastName = form.lastName;
      let accountType = form.accountType;
      try {
        const outcome = await createUserWithUserNameAndPassword(
          userName,
          password,
          mail,
          firstName,
          lastName,
          accountType
        );
        if (outcome.status === "Error") throw new Error(outcome.message);
        alert("Usuario registrado, haga click en Aceptar para continuar");
        history.push("/");
      } catch (err) {
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-form--center">
        <form onSubmit={handleSubmit} className="register-form--format">
          <div className="register-form__title-container">
            <label className="register-form__title-container__text">
              Register
            </label>
          </div>
          <AlignedFields
            firstField={firstNameField}
            secondField={lastNameField}
            handleChange={handleChange}
          />

          <AlignedFields
            firstField={userNameField}
            secondField={mailField}
            handleChange={handleChange}
          />
          {passwordFields.map((field, index) => (
            <FormSecretField
              field={field}
              key={index}
              handleChange={handleChange}
            />
          ))}
          <div className="register-field-container-select">
            <label>Tipo de Cuenta:</label>
            <select
              value={form.accountType}
              name="accountType"
              onChange={handleChange}
            >
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <FormSubmit value="Registrarse"></FormSubmit>
          <div className="register-form__message-container">
            <label className="register-form__message-container__text--error">
              {errorMessage}
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
