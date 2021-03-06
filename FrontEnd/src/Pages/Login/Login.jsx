import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./Login.scss";
import { signInWithUsernameAndPassword } from "../../api/userApi";
import FormField from "../../Components/FormField/FormField.jsx";
import FormSubmit from "../../Components/FormSubmit/FormSubmit.jsx";
import FormSecretField from "../../Components/FormSecretField/FormSecretField.jsx";
import {
  checkPasswordNotEmptyLogin,
  checkUsernameNotEmptyLogin,
} from "../../Functions/checkUserFormFunctions";

function Login(props) {
  const [form, setForm] = useState({ username: "", password: "" });
  const usernameField = {
    name: "username",
    label: "Username:",
    value: form.username,
    placeholder: "Introduzca el Username",
    type: "text",
    disabled: false,
  };
  const passwordField = {
    name: "password",
    label: "Password:",
    value: form.password,
    placeholder: "Introduza la contraseña",
    disabled: false,
  };
  let history = useHistory();
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
    let username = form.username;
    let password = form.password;
    try {
      checkUsernameNotEmptyLogin(username);
      checkPasswordNotEmptyLogin(password);
      const response = await signInWithUsernameAndPassword(username, password);
      if (response.status !== 200) {
        switch (response.status) {
          case 404:
            setErrorMessage("User not Found");
            break;
          case 401:
            setErrorMessage("Invalid Password");
            break;
          default:
            setErrorMessage("Error when logging in");
            break;
        }
      } else {
        console.log(response)
        props.loadUserData(
          response.user.username,
          response.token,
          response.user.firstName
        );
        history.push("/");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-form--center login-form--animation">
        <form onSubmit={handleSubmit} className="login-form--format">
          <div className="login-form__title-container ">
            <label className="login-form__title-container__text">Login</label>
          </div>
          <FormField field={usernameField} handleChange={handleChange} />
          <FormSecretField field={passwordField} handleChange={handleChange} />
          <FormSubmit value="Ingresar"></FormSubmit>
          <div className="login-form__register-text">
            <label>
              {" "}
              ¿Aún no tenes una cuenta? Haga click{" "}
              <Link to={"/Register"}>aquí </Link>
            </label>
          </div>
          <div className="login-form__message-container">
            <label className="login-form__message-container__text--error">
              {errorMessage}
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
