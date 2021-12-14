import { useContext, useState } from "react";
import { useHistory } from "react-router";
import userContext from "../Config/context";
import "./Forms.css";
import { signInWithUserNameAndPassword } from "../services/userServices";

function Login(props) {
  const [form, setForm] = useState({ userName: "", password: "" });
  const fields = [
    {
      name: "userName",
      label: "UserName:",
      value: form.userName,
      placeholder: "Introduzca el UserName",
    },
    {
      name: "password",
      label: "Password:",
      value: form.password,
      placeholder: "Introduza la contraseña",
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
      const userInfo = await signInWithUserNameAndPassword(
        userName,
        password
      );
      if (userInfo.status === "Error") throw new Error(userInfo.message);
      context.logInUserContext(userInfo.data.user, userInfo.data.token);
      history.push("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <userContext.Consumer>
      {(context) => (
        <div className="page">
          <div className="loginFormContainer">
            <div className="titleDiv">Login</div>
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
                <input className="buttonForm" type="submit" value="Ingresar" />
              </div>
              <div className="errorDiv">{errorMessage}</div>
            </form>
          </div>
        </div>
      )}
    </userContext.Consumer>
  );
}

export default Login;
