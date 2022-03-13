import axios from "axios";
const baseURL = "http://localhost:8080";

function createTokenAuthorizationHeader(token) {
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
}

export async function getAllItems() {
  const response = await axios.get(baseURL + "/products");
  return response.data;
}

export async function getItemById(id) {
  const response = await axios.get(baseURL + `/details/${id}`);
  return response.data;
}

export async function updateProductDataById(id, username, token, newData) {
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
  return await response.data;
}

export async function createProduct(username, token, newData) {
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
  return await response.data;
}

export async function deleteProductById(id, username, token) {
  const response = await axios.delete(baseURL + `/gestion_productos/${id}`, {
    headers: createTokenAuthorizationHeader(token)
  });
  return await response.data;
}
