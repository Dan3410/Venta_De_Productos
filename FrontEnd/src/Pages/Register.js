import { useState } from "react";
import { useHistory } from "react-router";
import "./Forms.css";
import { createUserWithUserNameAndPassword } from "../services/userServices";
import FormField from "../Components/FormField";
import FormSubmit from "../Components/FormSubmit";

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
  const fields = [
    {
      name: "firstName",
      label: "Nombre: ",
      value: form.firstName,
      placeholder: "Introduzca su nombre",
      type: "text",
      disabled: false,
    },
    {
      name: "lastName",
      label: "Apellido: ",
      value: form.lastName,
      placeholder: "Introduzca su apellido",
      type: "text",
      disabled: false,
    },
    {
      name: "userName",
      label: "UserName:",
      value: form.userName,
      placeholder: "Introduzca el UserName",
      type: "text",
      disabled: false
    },
    {
      name: "mail",
      label: "Mail: ",
      value: form.mail,
      placeholder: "Introduzca su mail",
      type: "text",
      disabled: false
    },
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
    console.log(Object.values(form).indexOf("") > -1);
    if (Object.values(form).indexOf("") > -1) {
      setErrorMessage("Debe llenar todos los campos");
    } else if (password !== confirmpassword) {
      setErrorMessage(
        "El valor ingresado en contraseña y confirmar contraseña deben ser iguales"
      );
    } else if (password.length < 6) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres");
    } else if (password.length > 14){
      setErrorMessage("La contraseña debe tener menos de 15 caracteres")
    }else{
      let mail = form.mail;
      let userName = form.userName;
      let firstName = form.firstName;
      let lastName = form.lastName;
      let accountType = form.accountType;
      try {
        await createUserWithUserNameAndPassword(
          userName,
          password,
          mail,
          firstName,
          lastName,
          accountType
        );
        alert("Usuario registrado, haga click en Aceptar para continuar");
        history.push("/");
      } catch (err) {
        console.log(err);
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <div className="page">
      <div className="registerFormContainer">
        <div className="titleDiv">Register</div>
        <form onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <FormField
              field={field}
              key={index}
              handleChange={handleChange}
            ></FormField>
          ))}
          <div className="divForm">
            Tipo de Cuenta:
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
        </form>
        <div className="errorDiv">{errorMessage}</div>
      </div>
    </div>
  );
}

export default Register;
