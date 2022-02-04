import "./FormSubmit.scss";

function FormSubmit(props) {
  return (
      <input
        className="submit-container__input draw meet"
        type="submit"
        value={props.value}
      />
  );
}

export default FormSubmit;
