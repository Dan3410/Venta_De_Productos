import Details from "../Components/Details"
import "./ProductDetails.css"

function ProductDetail(props) {
    return (
        <Details idItemAMostrar={props.match.params.id}></Details>
    )
}
export default ProductDetail