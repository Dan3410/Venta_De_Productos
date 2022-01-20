import "./ResizableFormField.scss";

function ResizableFormField(props) {
  return (
    <div className="field-container">
      <label>{props.field.label}</label>
      <textarea
        className="resizable-field-container__input field-container__input"
        type={props.field.type}
        placeholder={props.field.placeholder}
        name={props.field.name}
        value={props.field.value}
        onChange={props.handleChange}
        key={props.index}
        disabled={props.field.disabled}
      />
    </div>
  );
}

export default ResizableFormField;
