import FormField from "../FormField/FormField";
import "./AlignedFields.scss"

function AlignedFields(props) {
  return (
    <div>
      <span className="aligned-field-container--left">
        <FormField field={props.firstField} handleChange={props.handleChange} />
      </span>
      <span className="aligned-field-container--right">
        <FormField field={props.secondField} handleChange={props.handleChange} />
      </span>
    </div>
  );
}

export default AlignedFields;