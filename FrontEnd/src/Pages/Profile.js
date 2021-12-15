import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import userContext from "../Config/context";
import {
  obtainUserDataByUserName,
  updateUserData,
} from "../services/userServices";
import "./Profile.css";
import FormField from "../Components/FormField.js";
import FormSubmit from "../Components/FormSubmit";

function Profile(props) {
  let history = useHistory();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mail: "",
    userName: "",
    password: "",
    confirmPassword: "",
    accountType: "",
  });
  const fields = [
    {
      name: "firstName",
      label: "Nombre: ",
      value: form.firstName,
      placeholder: "Introduzca su nombre",
      disabled: false,
      type: "text",
    },
    {
      name: "lastName",
      label: "Apellido: ",
      value: form.lastName,
      placeholder: "Introduzca su apellido",
      disabled: false,
      type: "text",
    },
    {
      name: "userName",
      label: "UserName:",
      value: form.userName,
      placeholder: "",
      disabled: true,
      type: "text",
    },
    {
      name: "mail",
      label: "Mail: ",
      value: form.mail,
      placeholder: "Introduzca su mail",
      disabled: true,
      type: "text",
    },
    {
      name: "accountType",
      label: "Tipo de Cuenta: ",
      value: form.accountType,
      placeholder: "",
      disabled: true,
      type: "text",
    },
  ];
  const changePasswordFields = [
    {
      name: "password",
      label: "Password:",
      value: form.password,
      placeholder: "Introduza la contraseña",
      disabled: false,
      type: "password",
    },
    {
      name: "confirmPassword",
      label: "Confirmar Contraseña:",
      value: form.confirmPassword,
      placeholder: "Reintroduzca la contraseña",
      disabled: false,
      type: "password",
    },
  ];

  const context = useContext(userContext);
  const [errorMessage, setErrorMessage] = useState();
  const [changeMessage, setChangeMessage] = useState();

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const updateData = (e) => {
    e.preventDefault();
    let errorSettled = false;
    console.log(form.password);
    console.log(form.confirmPassword);
    if (form.password !== "" && form.confirmPassword === "") {
      setErrorMessage("Si desea modificar la contraseña, debe confirmarla");
      errorSettled = true;
    }
    if (form.password === "" && form.confirmPassword !== "") {
      setErrorMessage(
        "Ambos campos deben estar completados si quiere cambiar la contraseña"
      );
      errorSettled = true;
    }
    if (form.password !== form.confirmPassword && !errorSettled) {
      setErrorMessage(
        "El campo Contraseña y Confirmar Contraseña deben coincidir"
      );
      errorSettled = true;
    }

    if (form.firstName === "" || form.lastName === "") {
      setErrorMessage("El campo nombre y apellido no pueden ser vacios");
      errorSettled = false;
    }
    if (!errorSettled) {
      let firstName = form.firstName;
      let lastName = form.lastName;
      let password = form.password;
      let userName = form.userName;
      updateUserData(
        userName,
        firstName,
        lastName,
        password,
        context.token
      ).then((response) => {
        if (response.status === "Success") {
          context.changeName(firstName);
          setChangeMessage("Cambios realizados");
          setErrorMessage("");
        } else {
          setErrorMessage(response.message);
        }
      });
    } else {
      setChangeMessage("");
    }
  };

  useEffect(() => {
    if (context.isLoggedIn) {
      if (context.userName === props.match.params.userName) {
        try {
          obtainUserDataByUserName(context.userName, context.token).then(
            (userData) => {
              setForm({
                ...form,
                firstName: userData.data.user.firstName,
                lastName: userData.data.user.lastName,
                mail: userData.data.user.email,
                userName: userData.data.user.userName,
                accountType: userData.data.user.accountType,
              });
            }
          );
        } catch (error) {}
      } else {
        history.push("");
      }
    } else {
      alert("Debe logearse para acceder a esta sección");
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <userContext.Consumer>
      {(context) => (
        <div className="pageProfile">
          <div className="form--center">
            <form onSubmit={updateData} className="form--format">
            <div className="form__title-container">
              <label className="form__title-container__text">Datos del Usuario</label>
            </div>
              {fields.map((field, index) => (
                <FormField
                  field={field}
                  key={index}
                  handleChange={handleChange}
                ></FormField>
              ))}
              <br />
              <label>
                Aquí puede modificar los datos. Una vez modificados haga click
                en Confirmar Modificaciones
              </label>{" "}
              <br></br>
              {changePasswordFields.map((field, index) => (
                <FormField
                  field={field}
                  key={index}
                  handleChange={handleChange}
                ></FormField>
              ))}
              <FormSubmit value="Confirmar Modificaciones"></FormSubmit>
            </form>
            <div className="form__message-container">
              <label className="form__message-container__text--error">
                {errorMessage}
              </label>
            </div>
            <div className="form__message-container">
              <label className="form__message-container__text--success">
                {changeMessage}
              </label>
            </div>
          </div>
        </div>
      )}
    </userContext.Consumer>
  );
}

export default Profile;
