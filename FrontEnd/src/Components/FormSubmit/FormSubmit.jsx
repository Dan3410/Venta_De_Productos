import "./FormSubmit.css";

function FormSubmit(props) {
  return (
    <div className="submit-container">
      <input
        className="submit-container__input"
        type="submit"
        value={props.value}
      />
    </div>
  );
}

export default FormSubmit;
