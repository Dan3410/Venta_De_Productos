import { ADD_PRODUCT, CHANGE_QUANTITY, DECREMENT_QUANTITY, DELETE_ALL_PRODUCTS, DELETE_PRODUCT, INCREMENT_QUANTITY } from "./actionsType";

export function addProduct(producto, quantity) {
  return { type: ADD_PRODUCT, product: producto, quantity: quantity};
}

export function deleteProduct(productCode) {
  return {type: DELETE_PRODUCT, productCode: productCode}
}

export function decreaseQuantityByOne(productCode) {
  return {type: DECREMENT_QUANTITY, productCode: productCode}
}

export function increaseQuantityByOne(productCode) {
  return {type: INCREMENT_QUANTITY, productCode: productCode}
}

export function changeQuantity(productCode, quantity) {
  return {type: CHANGE_QUANTITY, productCode: productCode, quantity:quantity}
}

export function deleteAllProducts(){
  return {type: DELETE_ALL_PRODUCTS}
}