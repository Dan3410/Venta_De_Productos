import "./FormField.css";

function FormField(props) {
  return (
    <div className="field-container">
      <label>{props.field.label}</label>
      <input
        className="field-container__input"
        type={props.field.type}
        placeholder={props.field.placeholder}
        name={props.field.name}
        value={props.field.value}
        onChange={props.handleChange}
        key={props.index}
        disabled={props.field.disabled}
      ></input>
    </div>
  );
}

export default FormField;
