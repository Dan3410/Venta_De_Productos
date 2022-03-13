import axios from "axios";
const baseURL = "http://localhost:8080";

function createTokenAuthorizationHeader(token) {
  return "Bearer " + token;
}

export async function signInWithUsernameAndPassword(username, contraseña) {
  try {
    const response = await axios.post(
      baseURL + `/login/${username}`,
      {
        password: contraseña,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return {
      status: response.status,
      user: response.data.data.user,
      token: response.data.data.token,
    };
  } catch (error) {
    return { status: error.response.status, user: null };
  }
}

export async function obtainUserData(token) {
  try {
    const response = await axios.get(baseURL + `/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: createTokenAuthorizationHeader(token),
      },
    });
    return { status: response.status, user: response.data.data.user };
  } catch (error) {
    return { status: error.response.status, user: null };
  }
}

export async function updateUserData(firstName, lastName, password, token) {
  try {
    const response = await axios.put(
      baseURL + `/profile`,
      {
        firstName: firstName,
        lastName: lastName,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: createTokenAuthorizationHeader(token),
        },
      }
    );
    return { status: response.status, user: response.data.data.user };
  } catch (error) {
    return { status: error.response.status, user: null };
  }
}

export async function createUserWithUsernameAndPassword(
  username,
  contraseña,
  mail,
  firstName,
  lastName,
  accountType
) {
  try {
    const response = await axios.post(
      baseURL + "/register",
      {
        username: username,
        password: contraseña,
        mail: mail,
        firstName: firstName,
        lastName: lastName,
        accountType: accountType,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return { status: response.status, user: response.data.data.user };
  } catch (error) {
    return { status: error.response.status, user: null };
  }
}
