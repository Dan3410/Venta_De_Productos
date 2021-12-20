import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import {
  obtainUserDataByUserName,
  updateUserDataByUserName,
} from "../../services/userServices";
import "./Profile.css";
import { changeNameInLocalStorage } from "../../Config/LocalStorage";
import Register_ProfileForm from "../../Components/Register_ProfileForm/Register_ProfileForm";

function Profile(props) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mail: "",
    userName: "",
    password: "",
    confirmPassword: "",
    accountType: "",
  });


  let history = useHistory();

  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setChangeMessage] = useState();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userName = localStorage.getItem("userName");
  const token = localStorage.getItem("token");

  const updateUserData = (e) => {
    e.preventDefault();
    let errorSettled = false;
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
    if (
      form.password !== "" &&
      (form.password.length < 6 || form.password.length > 14) &&
      !errorSettled
    ) {
      setErrorMessage("La contraseña debe tener entre 6 y 14 caracteres");
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
      updateUserDataByUserName(userName, firstName, lastName, password, token).then(
        (response) => {
          if (response.status === "Success") {
            changeNameInLocalStorage(firstName);
            setChangeMessage("Cambios realizados");
            setErrorMessage("");
            history.push(`/Profile/${userName}`);
          } else {
            setErrorMessage(response.message);
            setChangeMessage("");
          }
        }
      );
    } else {
      setChangeMessage("");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      if (userName === props.match.params.userName) {
        try {
          obtainUserDataByUserName(userName, token).then((userData) => {
            if(userData.status !== "Error")
            setForm({
              ...form,
              firstName: userData.data.user.firstName,
              lastName: userData.data.user.lastName,
              mail: userData.data.user.mail,
              userName: userData.data.user.userName,
              accountType: userData.data.user.accountType,
            });
            else 
              setErrorMessage(userData.message)
          });
        } catch (error) {
          setErrorMessage(error.message);
        }
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
    // eslint-disable-next-line react/jsx-pascal-case
    <Register_ProfileForm
     disableUnmodifiableData={true}
     onSubmit={updateUserData}
     titleText="Datos del Usuario"
     buttonText="Confirmar Modificaciones"
     descriptionText="Aquí puede modificar los datos. Una vez modificados haga click en
     Confirmar Modificaciones"
     form={{formData: form, setForm: setForm}}
     errorMessage={errorMessage}
     successMessage={successMessage}
     accountTypeOptions={null}/>
  );
}

export default Profile;
