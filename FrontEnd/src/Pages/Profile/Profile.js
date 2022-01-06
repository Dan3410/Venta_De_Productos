import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { updateUserDataByUsername } from "../../services/userServices";
import {
  changeNameInLocalStorage,
  getIsLoggedIn,
  getToken,
  getUsername,
} from "../../Config/LocalStorage";
import { loadUserData } from "../../Functions/userFunctions";
import Register_ProfileForm from "../../Components/Register_ProfileForm/Register_ProfileForm";
import "./Profile.css";
import { checkEqualPasswordAndConfirmPasswordFields, checkFirstNameNotEmpty, checkLastNameNotEmpty, checkLengthPassword, checkPasswordAndConfirmPasswordFieldFilled } from "../../Functions/checkUserFormFunctions";


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
  const username = getUsername();
  const token = getToken();
  const isLoggedIn = getIsLoggedIn();

  const updateUserData = (e) => {
    e.preventDefault();
    try{
    checkPasswordAndConfirmPasswordFieldFilled(form.password,form.confirmPassword)
    checkLengthPassword(form.password)
    checkEqualPasswordAndConfirmPasswordFields(form.password,form.confirmPassword)
    checkFirstNameNotEmpty(form.firstName)
    checkLastNameNotEmpty(form.lastName)
      let firstName = form.firstName;
      let lastName = form.lastName;
      let password = form.password;
      let userName = form.userName;
      updateUserDataByUsername(
        userName,
        firstName,
        lastName,
        password,
        token
      ).then((response) => {
        if (response.status === "Success") {
          changeNameInLocalStorage(firstName);
          setChangeMessage("Cambios realizados");
          setErrorMessage("");
          history.push(`/Profile/${userName}`);
        } else {
          setChangeMessage("")
          throw new Error(response.message);
        }
      });
    }catch(e){
      setErrorMessage(e.message)
      setChangeMessage("")
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      console.log(username);
      if (username === props.match.params.username) {
        try {
          loadUserData(username, token, form, setForm);
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
      form={{ formData: form, setForm: setForm }}
      errorMessage={errorMessage}
      successMessage={successMessage}
      accountTypeOptions={null}
    />
  );
}

export default Profile;
