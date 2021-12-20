import { useState } from "react";
import { useHistory } from "react-router";
import "./Register.css";
import { createUserWithUserNameAndPassword } from "../../services/userServices";
import Register_ProfileForm from "../../Components/Register_ProfileForm/Register_ProfileForm";

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
    // eslint-disable-next-line react/jsx-pascal-case
    <Register_ProfileForm
     disableUnmodifiableData={false}
     onSubmit={handleSubmit}
     titleText="Registrarse"
     buttonText="Registrarse"
     descriptionText={null}
     form={{formData: form, setForm: setForm}}
     errorMessage={errorMessage}
     successMessage={null}
     accountTypeOptions={options}/>
  );
}

export default Register;
