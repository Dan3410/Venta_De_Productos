import axios from "axios"
const baseURL = "http://localhost:8080"

export async function signInWithUsernameAndPassword(userName, contraseña) {
  const response = await axios.post(baseURL + "/login", {
    headers: { "Content-Type": "application/json" },
    userName: userName,
    password: contraseña
  });
  return await response.data;
}

export async function obtainUserDataByUsername(userName, token) {
  const response = await axios.get(baseURL + `/profile/${userName}/${token}`);
  return await response.data;
}

export async function updateUserDataByUsername(userName, firstName, lastName, password,token) {
  const response = await axios.post(baseURL + `/profile`, {
    headers: { "Content-Type": "application/json" },
    userName: userName,
    firstName: firstName,
    lastName: lastName,
    token: token,
    password: password
  });
  return await response.data;
}

export async function createUserWithUsernameAndPassword(
  userName,
  contraseña,
  mail,
  firstName,
  lastName,
  accountType
) {
  const response = await axios.post("register", {
    headers: { "Content-Type": "application/json" },
      userName: userName,
      password: contraseña,
      mail: mail,
      firstName: firstName,
      lastName: lastName,
      accountType: accountType
    })
  return await response.data;
}
