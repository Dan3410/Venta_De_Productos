import AlignedFields from "../AlignedFields/AlignedFields.jsx";
import FormField from "../FormField/FormField.jsx";
import FormSecretField from "../FormSecretField/FormSecretField.jsx";
import FormSubmit from "../FormSubmit/FormSubmit.jsx";
import "./UserForm.css";

function Register_ProfileForm(props) {

  const firstNameField = {
    name: "firstName",
    label: "Nombre: ",
    value: props.form.formData.firstName,
    placeholder: "Introduzca su nombre",
    disabled: false,
    type: "text",
  };
  const lastNameField = {
    name: "lastName",
    label: "Apellido: ",
    value: props.form.formData.lastName,
    placeholder: "Introduzca su apellido",
    disabled: false,
    type: "text",
  };
  const usernameField = {
    name: "username",
    label: "Username:",
    value: props.form.formData.username,
    placeholder: "Ingrese el nombre de usuario",
    disabled: props.disableUnmodifiableData,
    type: "text",
  };
  const mailField = {
    name: "mail",
    label: "Mail: ",
    value: props.form.formData.mail,
    placeholder: "Introduzca su mail",
    disabled: props.disableUnmodifiableData,
    type: "text",
  };
  const accountTypeField = {
    name: "accountType",
    label: "Tipo de Cuenta: ",
    value: props.form.formData.accountType,
    placeholder: "",
    disabled: props.disableUnmodifiableData,
    type: "text",
  };
  const changePasswordFields = [
    {
      name: "password",
      label: "Nueva contraseña:",
      value: props.form.formData.password,
      placeholder: "Introduzca la nueva contraseña",
      disabled: false,
      type: "password",
    },
    {
      name: "confirmPassword",
      label: "Confirmar Contraseña:",
      value: props.form.formData.confirmPassword,
      placeholder: "Reintroduzca la contraseña",
      disabled: false,
      type: "password",
    },
  ];

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    props.form.setForm({
      ...props.form.formData,
      [name]: value,
    });
  };

  return (
    <div className="register-profile-form-page">
      <div className="register-profile-form--center ">
        <form onSubmit={props.onSubmit} className="register-profile-form--format">
          <div className="register-profile-form__title-container">
            <label className="register-profile-form__title-container__text">
              {props.titleText}
            </label>
          </div>
          <br />
          <label>{props.descriptionText}</label>

          <AlignedFields
            firstField={firstNameField}
            secondField={lastNameField}
            handleChange={handleChange}
          />

          <AlignedFields
            firstField={usernameField}
            secondField={mailField}
            handleChange={handleChange}
          />
          {props.accountTypeOptions === null ? 
            <FormField field={accountTypeField} handleChange={handleChange} />
           : (
            <div className="register-profile-form-field-container-select">
            <label>Tipo de Cuenta:</label>
            <select className="register-profile-form-field-container__select"
              value={props.form.formData.accountType}
              name="accountType"
              onChange={handleChange}
            >
              {props.accountTypeOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
           )}
          {changePasswordFields.map((field, index) => (
            <FormSecretField
              field={field}
              key={index}
              handleChange={handleChange}
            />
          ))}
          <FormSubmit value={props.buttonText}></FormSubmit>
          <div className="register-profile-form__message-container">
            <label className="register-profile-form__message-container__text--error">
              {props.errorMessage}
            </label>
          </div>
          <div className="register-profile-form__message-container">
            <label className="register-profile-form__message-container__text--success">
              {props.successMessage}
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register_ProfileForm;