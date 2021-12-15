function FormSubmit (props){
    return(<div className="divForm">
    <input
      className="buttonForm"
      type="submit"
      value={props.value}
    />
  </div>
  )
}

export default FormSubmit;