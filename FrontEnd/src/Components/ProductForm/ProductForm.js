
import AlignedFields from "../../Components/AlignedFields/AlignedFields";
import FormField from "../../Components/FormField/FormField";
import FormSubmit from "../../Components/FormSubmit/FormSubmit";
import ResizableFormField from "../../Components/ResizableFormField/ResizableFormField";

function ProductForm(props) {
    
      const photoField = {
        name: "photo",
        label: "Url de la Foto: ",
        value: props.form.formData.photo,
        placeholder: "Introduzca el URL a la foto",
        disabled: false,
        type: "text",
      };
    
      const nameField = {
        name: "name",
        label: "Nombre del producto: ",
        value: props.form.formData.name,
        placeholder: "Introduzca el nombre",
        disabled: false,
        type: "text",
      };
      const priceField = {
        name: "price",
        label: "Precio del producto: ",
        value: props.form.formData.price,
        placeholder: "Introduzca el precio",
        disabled: false,
        type: "text",
      };
      const codeField = {
        name: "code",
        label: "Codigo del producto: ",
        value: props.form.formData.code,
        placeholder: "Introduzca el codigo",
        disabled: false,
        type: "text",
      };
    
      const descriptionField = {
        name: "description",
        label: "Descripción del producto: ",
        value: props.form.formData.description,
        placeholder: "Describa el producto",
        disabled: false,
        type: "text",
      };
    
      const categoryField = {
        name: "category",
        label: "Categoria del producto: ",
        value: props.form.formData.category,
        placeholder: "Introduzca la categoria",
        disabled: false,
        type: "text",
      };
    
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
    <div className="product-form-page">
      <div className="product-form--center ">
        <form
          onSubmit={props.onSubmit}
          className="product-form--format"
        >
          <div className="product-form__title-container">
            <label className="product-form__title-container__text">
              {props.titleLabel}
            </label>
          </div>
          <br />
          <label>
            {props.descriptionLabel}
          </label>
          <br />
          <div className="product-form__image-container">
            <img
              src={props.form.formData.photo}
              alt="ERROR AL CARGAR LA FOTO"
              className="product-form__image"
            />
          </div>
          <AlignedFields
            firstField={nameField}
            secondField={codeField}
            handleChange={handleChange}
          />
          <AlignedFields
            firstField={categoryField}
            secondField={priceField}
            handleChange={handleChange}
          />

          <FormField field={photoField} handleChange={handleChange} />

          <ResizableFormField
            field={descriptionField}
            handleChange={handleChange}
          />
          <FormSubmit value="Confirmar Modificaciones"></FormSubmit>
          <div className="product-form__message-container">
        <label className="product-form__message-container__text--error">
          {props.errorMessage}
        </label>
      </div>
      <div className="product-form__message-container">
        <label className="product-form__message-container__text--success">
          {props.successMessage}
        </label>
      </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
