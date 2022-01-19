import {
  ADD_PRODUCT,
  CHANGE_QUANTITY,
  DECREMENT_QUANTITY,
  DELETE_ALL_PRODUCTS,
  DELETE_PRODUCT,
  INCREMENT_QUANTITY,
} from "./actionsType";

const initialState = {
  products: [],
};

function obtainProductIndex(products, productCode) {
  return products.map((element) => element.code).indexOf(productCode);
}

function modifyQuantity(products, productIndex, quantity) {
  return products.map((item, index) => {
    if (index === productIndex)
      return { ...item, quantity: Number(item.quantity + quantity) };
    return item;
  });
}

function addProductToCart(products, product, quantity) {
  const productIndex = obtainProductIndex(products, product.code);
  if (productIndex === -1) {
    product.quantity = quantity;
    return [...products.slice(), product];
  } else {
    return products;
  }
}

function deleteProductFromCart(products, productCode) {
  const productIndex = obtainProductIndex(products, productCode);
  if (productIndex > -1) {
    return [
      ...products.slice(0, productIndex),
      ...products.slice(productIndex + 1),
    ];
  }
}

function decrementQuantityOfProduct(products, productCode) {
  const productIndex = obtainProductIndex(products, productCode);
  if (productIndex > -1) return modifyQuantity(products, productIndex, -1);
}

function incrementQuantityOfProduct(products, productCode) {
  const productIndex = obtainProductIndex(products, productCode);
  if (productIndex > -1) return modifyQuantity(products, productIndex, +1);
}

function changeQuantityOfProduct(products, productCode,quantity) {
  const productIndex = obtainProductIndex(products, productCode);
  if (productIndex > -1)
    return modifyQuantity(
      products,
      productIndex,
      quantity - products[productIndex].quantity
    );
}

//Cada caso deberia devolver el nuevo estado

function cartReducer(state = initialState, action) {
  let newArrayProducts;
  switch (action.type) {
    case ADD_PRODUCT:
      newArrayProducts = addProductToCart(
        state.products,
        action.product,
        action.quantity
      );
      return { ...state, products: newArrayProducts };
    case DELETE_PRODUCT:
      newArrayProducts = deleteProductFromCart(
        state.products,
        action.productCode
      );
      return { ...state, products: newArrayProducts };
    case DECREMENT_QUANTITY:
      newArrayProducts = decrementQuantityOfProduct(
        state.products,
        action.productCode
      );
      return { ...state, products: newArrayProducts };
    case INCREMENT_QUANTITY:
      newArrayProducts = incrementQuantityOfProduct(
        state.products,
        action.productCode
      );
      return { ...state, products: newArrayProducts };
    case CHANGE_QUANTITY:
      newArrayProducts = changeQuantityOfProduct(
        state.products,
        action.productCode,
        action.quantity
      );
      return { ...state, products: newArrayProducts };
    case DELETE_ALL_PRODUCTS:
      return { ...state, products: [] };
    default:
      return state;
  }
}

export default cartReducer;
