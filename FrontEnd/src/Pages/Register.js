import { useState } from "react";
import { useHistory } from "react-router";
import "./Forms.css";
import { createUserWithUserNameAndPassword } from "../services/userServices";

function Register(props) {
  let history = useHistory();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mail: "",
    userName: "",
    accountType: "",
    password: "",
    confirmPassword: "",
  });
  const fields = [
    {
      name: "firstName",
      label: "Nombre: ",
      value: form.firstName,
      placeholder: "Introduzca su nombre"
    },
    {
      name: "lastName",
      label: "Apellido: ",
      value: form.lastName,
      placeholder: "Introduzca su apellido"
    },
    {
      name: "userName",
      label: "UserName:",
      value: form.userName,
      placeholder: "Introduzca el UserName",
    },
    {
      name: "mail",
      label: "Mail: ",
      value: form.mail,
      placeholder: "Introduzca su mail"
    },
    {
      name: "password",
      label: "Password:",
      value: form.password,
      placeholder: "Introduza la contraseña",
    },
    {
      name: "confirmPassword",
      label: "Confirmar Contraseña:",
      value: form.confirmPassword,
      placeholder: "Reintroduzca la contraseña"
    }
  ];

  const options = [
    {
      label: "Cuenta común",
      value: "common",
    },
    {
      label: "Cuenta Empresarial",
      value: "admin",
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
    let mail = form.mail;
    let userName = form.userName;
    let firstName = form.firstName;
    let lastName = form.lastName;
    let accountType = form.accountType;
    let password = form.password;
    let confirmpassword = form.confirmPassword;
    if (
      mail === "" ||
      userName === "" ||
      firstName === "" ||
      lastName === "" ||
      accountType === "" ||
      password === "" ||
      confirmpassword === ""
    ) {
      setErrorMessage("Debe llenar todos los campos");
    } else if (password !== confirmpassword) {
      setErrorMessage("La contraseña no concuerda");
    } else {
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
        if (err.code === "auth/weak-password") {
          setErrorMessage("El password debe tener al menos 6 caracteres");
        }
        if (err.code === "auth/email-already-in-use") {
          setErrorMessage("Ya hay un usuario con ese email registrado");
        }
      }
    }
  };

  return (
    <div className="page">
      <div className="registerFormContainer">
        <div className="titleDiv">Register</div>
        <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
                <div className="divForm">
                  <label>{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    name={field.name}
                    value={field.value}
                    onChange={handleChange}
                  ></input>
                </div>
              ))}
          <div className="divForm">
            Tipo de Cuenta:
            <select
              value={form.accountType}
              name="accountType"
              onChange={handleChange}
            >
              {options.map((option,index) => (
                <option key={index} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="divForm">
            <input className="buttonForm" type="submit" value="Registrarse" />
          </div>
        </form>
        <div className="errorDiv">{errorMessage}</div>
      </div>
    </div>
  );
}

export default Register;
