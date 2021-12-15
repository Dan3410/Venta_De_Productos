import { useContext, useState } from "react";
import { useHistory } from "react-router";
import userContext from "../Config/context";
import "./Forms.css";
import { signInWithUserNameAndPassword } from "../services/userServices";
import FormField from "../Components/FormField";
import FormSubmit from "../Components/FormSubmit";

function Login(props) {
  const [form, setForm] = useState({ userName: "", password: "" });
  const fields = [
    {
      name: "userName",
      label: "UserName:",
      value: form.userName,
      placeholder: "Introduzca el UserName",
      type: "text",
      disabled: false,
    },
    {
      name: "password",
      label: "Password:",
      value: form.password,
      placeholder: "Introduza la contraseña",
      type: "password",
      disabled: false,
    },
  ];
  let history = useHistory();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userName = form.userName;
    let password = form.password;
    try {
      const response = await signInWithUserNameAndPassword(userName, password);
      if (response.status === "Error") throw new Error(response.message);
      context.logInUserContext(response.data.user, response.data.token);
      history.push("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <userContext.Consumer>
      {(context) => (
        <div className="page">
          <div className="form--center">
            <form onSubmit={handleSubmit} className="form--format">
              <div className="form__title-container ">
                <label className="form__title-container__text">Login</label>
              </div>
              {fields.map((field, index) => (
                <FormField
                  field={field}
                  key={index}
                  handleChange={handleChange}
                ></FormField>
              ))}
              <FormSubmit value="Ingresar"></FormSubmit>
              <div className="form__message-container">
                <label className="form__message-container__text--error">
                  {errorMessage}
                </label>
              </div>
            </form>
          </div>
        </div>
      )}
    </userContext.Consumer>
  );
}

export default Login;
