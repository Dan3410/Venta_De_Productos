import { useState } from "react";
import { setDataInLocalStorage } from "../../Config/LocalStorage/LocalStorage";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./Login.css";
import { signInWithUsernameAndPassword } from "../../services/userServices";
import FormField from "../../Components/FormField/FormField";
import FormSubmit from "../../Components/FormSubmit/FormSubmit";
import FormSecretField from "../../Components/FormSecretField/FormSecretField";
import { checkPasswordNotEmptyLogin, checkUsernameNotEmptyLogin } from "../../Functions/checkUserFormFunctions";

function Login(props) {
  const [form, setForm] = useState({ userName: "", password: "" });
  const userNameField = {
    name: "userName",
    label: "UserName:",
    value: form.userName,
    placeholder: "Introduzca el UserName",
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
    let username = form.userName;
    let password = form.password;
    try {
    checkUsernameNotEmptyLogin(username)
    checkPasswordNotEmptyLogin(password)
      const response = await signInWithUsernameAndPassword(username, password);
      if (response.status === "Error") throw new Error(response.message);
      setDataInLocalStorage(response.data.user, response.data.token);
      history.push("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-form--center">
        <form onSubmit={handleSubmit} className="login-form--format">
          <div className="login-form__title-container ">
            <label className="login-form__title-container__text">Login</label>
          </div>
          <FormField field={userNameField} handleChange={handleChange} />
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
