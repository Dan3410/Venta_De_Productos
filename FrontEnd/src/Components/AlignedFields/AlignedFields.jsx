import FormField from "../FormField/FormField";
import "./AlignedFields.scss"

function AlignedFields(props) {
  return (
    <div>
      <div className="aligned-field-container--left">
        <FormField field={props.firstField} handleChange={props.handleChange} />
      </div>
      <div className="aligned-field-container--right">
        <FormField field={props.secondField} handleChange={props.handleChange} />
      </div>
    </div>
  );
}

export default AlignedFields;