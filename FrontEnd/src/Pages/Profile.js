import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import userContext from "../Config/context";
import {
  obtainUserDataByUserName,
  updateUserData,
} from "../services/userServices";
import "./Profile.css";

function Profile(props) {
  let history = useHistory();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mail: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const fields = [
    {
      name: "firstName",
      label: "Nombre: ",
      value: form.firstName,
      placeholder: "Introduzca su nombre",
      disabled: false,
    },
    {
      name: "lastName",
      label: "Apellido: ",
      value: form.lastName,
      placeholder: "Introduzca su apellido",
      disabled: false,
    },
    {
      name: "userName",
      label: "UserName:",
      value: form.userName,
      placeholder: "Introduzca el UserName",
      disabled: true,
    },
    {
      name: "mail",
      label: "Mail: ",
      value: form.mail,
      placeholder: "Introduzca su mail",
      disabled: true,
    },
  ];
  const changePasswordFields = [
    {
      beforeField:
        "Para modificar la contraseña debe completar ambos campos. Caso contrario ignore ambos campos.",
      name: "password",
      label: "Password:",
      value: form.password,
      placeholder: "Introduza la contraseña",
      disabled: false,
    },
    {
      name: "confirmPassword",
      label: "Confirmar Contraseña:",
      value: form.confirmPassword,
      placeholder: "Reintroduzca la contraseña",
      disabled: false,
    },
  ];

  const context = useContext(userContext);
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

  const updateData = (e) => {
    e.preventDefault();
    let errorSettled = false;
    if (form.password !== "" && form.confirmPassword === "") {
      setErrorMessage("Si desea modificar la contraseña, debe confirmarla");
      errorSettled = true;
    }
    if (form.password === "" && form.confirmPassword !== "") {
      setErrorMessage(
        "Ambos campos dben estar completados si quiere cambiar la contraseña"
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
        }
      });
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
          <div className="registerFormContainer">
            <div className="titleDiv">Datos del Usuario</div>
            <form onSubmit={updateData}>
              {fields.map((field, index) => (
                <div className="divForm">
                  <label>{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    name={field.name}
                    value={field.value}
                    onChange={handleChange}
                    disabled={field.disabled}
                    key={index}
                  ></input>
                </div>
              ))}
              <label>
                Aquí puede modificar los datos. Una vez modificados haga click
                en Confirmar Modificaciones
              </label> <br></br>

              {changePasswordFields.map((field, index) => (
                <div className="divForm">
                  <label>{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    name={field.name}
                    value={field.value}
                    onChange={handleChange}
                    disabled={field.disabled}
                    key={index+fields.length}
                  ></input>
                </div>
              ))}
              <div className="divForm">
                <input
                  className="buttonForm"
                  type="submit"
                  value="Confirmar Modificaciones"
                  onClick={updateData}
                />
              </div>
            </form>
            <div className="errorDiv">{errorMessage}</div>
          </div>
        </div>
      )}
    </userContext.Consumer>
  );
}

export default Profile;
