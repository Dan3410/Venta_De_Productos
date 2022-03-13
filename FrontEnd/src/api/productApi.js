import axios from "axios";
const baseURL = "http://localhost:8080";

function createTokenAuthorizationHeader(token) {
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
}

export async function getAllItems() {
  try {
    const response = await axios.get(baseURL + "/products");
    return { status: response.status, products: response.data.data };
  } catch (error) {
    return { status: error.response.status, products: null };
  }
}

export async function getItemById(id) {
  try {
    const response = await axios.get(baseURL + `/details/${id}`);
    return { status: response.status, product: response.data.data };
  } catch (error) {
    return { status: error.response.status, product: null };
  }
}

export async function updateProductDataById(id, username, token, newData) {
  try {
    const response = await axios.put(
      baseURL + `/gestion_productos/${id}`,
      {
        username: username,
        productData: newData,
      },
      {
        headers: createTokenAuthorizationHeader(token),
      }
    );
    return { status: response.status, product: response.data.data };
  } catch (error) {
    return { status: error.response.status, product: null };
  }
}

export async function createProduct(username, token, newData) {
  try {
    const response = await axios.post(
      baseURL + `/gestion_productos`,
      {
        username: username,
        productData: newData,
      },
      {
        headers: createTokenAuthorizationHeader(token),
      }
    );
    return { status: response.status, product: response.data.data };
  } catch (error) {
    return { status: error.response.status, product: null };
  }
}

export async function deleteProductById(id, username, token) {
  try {
    const response = await axios.delete(baseURL + `/gestion_productos/${id}`, {
      headers: createTokenAuthorizationHeader(token),
    });
    return { status: response.status, product: response.data.data };
  } catch (error) {
    return { status: error.response.status, product: null };
  }
}
