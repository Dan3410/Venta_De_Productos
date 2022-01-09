import { useState } from "react";
import { useHistory } from "react-router";
import "./Register.css";
import { createUserWithUsernameAndPassword } from "../../services/userServices";
import {
  checkEqualPasswordAndConfirmPasswordFields,
  checkLengthPassword,
  checkMailFormat,
  checkFirstNameNotEmpty,
  checkLastNameNotEmpty,
  checkMailNotEmpty,
} from "../../Functions/checkUserFormFunctions";
import UserForm from "../../Components/UserForm/UserForm";

function Register(props) {
  let history = useHistory();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mail: "",
    username: "",
    accountType: "Cuenta común",
    password: "",
    confirmPassword: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let password = form.password;
    let confirmPassword = form.confirmPassword;
    try {
      let mail = form.mail;
      let username = form.username;
      let firstName = form.firstName;
      let lastName = form.lastName;
      let accountType = form.accountType;
      checkLengthPassword(password);
      checkEqualPasswordAndConfirmPasswordFields(password, confirmPassword);
      checkMailNotEmpty(mail)
      checkMailFormat(mail)
      checkFirstNameNotEmpty(firstName)
      checkLastNameNotEmpty(lastName)

      const outcome = await createUserWithUsernameAndPassword(
        username,
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
  };

  return (
    // eslint-disable-next-line react/jsx-pascal-case
    <UserForm
      disableUnmodifiableData={false}
      onSubmit={handleSubmit}
      titleText="Registrarse"
      buttonText="Registrarse"
      descriptionText={null}
      form={{ formData: form, setForm: setForm }}
      errorMessage={errorMessage}
      successMessage={null}
      accountTypeOptions={options}
    />
  );
}

export default Register;
