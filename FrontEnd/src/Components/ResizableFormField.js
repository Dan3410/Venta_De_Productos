import "./ResizableFormField.css";

function ResizableFormField(props) {
  return (
    <div className="resizable-field-container">
      <label>{props.field.label}</label>
      <textarea
        className="resizable-field-container__input"
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
