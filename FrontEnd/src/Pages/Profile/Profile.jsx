import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { updateUserData } from "../../api/userApi";
import { loadUserData } from "../../Functions/userFunctions";
import UserForm from "../../Components/UserForm/UserForm.jsx";
import "./Profile.scss";
import {
  checkEqualPasswordAndConfirmPasswordFields,
  checkFirstNameNotEmpty,
  checkLastNameNotEmpty,
  checkLengthPassword,
  checkPasswordAndConfirmPasswordFieldFilled,
} from "../../Functions/checkUserFormFunctions";

function Profile(props) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mail: "",
    username: "",
    password: "",
    confirmPassword: "",
    accountType: "",
  });

  let history = useHistory();

  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setChangeMessage] = useState();
  const token = props.token;

  const handleSubmitData = (e) => {
    e.preventDefault();
    try {
      if (form.password !== "" && form.confirmPassword !== "") {
        checkLengthPassword(form.password);
        checkPasswordAndConfirmPasswordFieldFilled(
          form.password,
          form.confirmPassword
        );
        checkEqualPasswordAndConfirmPasswordFields(
          form.password,
          form.confirmPassword
        );
      }
      checkFirstNameNotEmpty(form.firstName);
      checkLastNameNotEmpty(form.lastName);
      let firstName = form.firstName;
      let lastName = form.lastName;
      let password = form.password;
      let username = form.username;
      updateUserData(firstName, lastName, password, token).then((response) => {
        if (response.status !== 200) {
          switch (response.status) {
            case 404:
              setErrorMessage("User not Found");
              break;
            default:
              setErrorMessage("Error when logging in");
              break;
          }
        } else {
          props.changeNameUserData(firstName);
          setChangeMessage("Cambios realizados");
          setErrorMessage("");
          history.push(`/Profile/${username}`);
        }
      });
    } catch (e) {
      setErrorMessage(e.message);
      setChangeMessage("");
    }
  };

  useEffect(() => {
    try {
      loadUserData(token, form, setForm,setErrorMessage);
    } catch (error) {
      setErrorMessage(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // eslint-disable-next-line react/jsx-pascal-case
    <div className="profile-page">
      <UserForm
        className={""}
        disableUnmodifiableData={true}
        onSubmit={handleSubmitData}
        titleText="Datos del Usuario"
        buttonText="Confirmar Modificaciones"
        descriptionText="Aquí puede modificar los datos. Una vez modificados haga click en
     Confirmar Modificaciones"
        form={{ formData: form, setForm: setForm }}
        errorMessage={errorMessage}
        successMessage={successMessage}
        accountTypeOptions={null}
      />
    </div>
  );
}

export default Profile;
