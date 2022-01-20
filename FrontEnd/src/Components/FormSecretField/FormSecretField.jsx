import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./FormSecretField.scss";
import { useState } from "react";

function FormSecretField(props) {
  const [typeInput, setType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);

  const showText = () => {
    setType("text");
    setShowPassword(true);
  };

  const hideText = () => {
    setType("password");
    setShowPassword(false);
  };

  return (
    <div className="field-container">
      <label>{props.field.label}</label>
      <input
        className="secret-field-container__input field-container__input"
        type={typeInput}
        placeholder={props.field.placeholder}
        name={props.field.name}
        value={props.field.value}
        onChange={props.handleChange}
        key={props.index}
        disabled={props.field.disabled}
      ></input>
      {!showPassword ? (
        <FontAwesomeIcon icon={faEye} onClick={showText} />
      ) : null}
      {showPassword ? (
        <FontAwesomeIcon icon={faEyeSlash} onClick={hideText} />
      ) : null}
    </div>
  );
}

export default FormSecretField;
