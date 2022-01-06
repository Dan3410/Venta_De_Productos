import axios from "axios";
const baseURL = "http://localhost:8080";

export async function getAllItems() {
  const response = await axios.get(baseURL + "/products");
  return response.data;
}

export async function getItemById(id) {
  const response = await axios.get(baseURL + `/detalles/${id}`);
  return response.data;
}

export async function updateProductDataById(id, userName, token, newData) {
  const response = await axios.put(baseURL + `/gestion_productos/${id}`, {
    headers: { "Content-Type": "application/json" },
    userName: userName,
    token: token,
    newData: newData,
  });
  return await response.data;
}

export async function createProductById(userName, token, newData) {
  const response = await axios.post(baseURL + `/gestion_productos`, {
    headers: { "Content-Type": "application/json" },
    userName: userName,
    token: token,
    newData: newData,
  });
  return await response.data;
}

export async function deleteProductById(id, userName, token) {
  const response = await axios.delete(baseURL + `/gestion_productos/${id}`, {
    headers: { "Content-Type": "application/json" },
    data: {
      userName: userName,
      token: token,
    },
  });
  return await response.data;
}
