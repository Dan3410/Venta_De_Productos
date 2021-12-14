export async function signInWithUserNameAndPassword(userName, contraseña) {
  const response = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName: userName, password: contraseña }),
  });
  return await response.json();
}

export async function obtainUserDataByUserName(userName, token) {
  const response = await fetch(`/profile/${userName}/${token}`);
  return await response.json();
}

export async function updateUserData(userName, firstName, lastName, password,token) {
  let messageBody;
  if (password !== ""){
    messageBody = {
      userName: userName,
      password: password,
      firstName: firstName,
      lastName: lastName,
      token: token
    }
  }else{
    messageBody = {
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      token: token
    }
  }
  const response = await fetch(`/profile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(messageBody),
  });
  return await response.json();
}

export async function createUserWithUserNameAndPassword(
  userName,
  contraseña,
  mail,
  firstName,
  lastName,
  accountType
) {
  const response = await fetch("register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userName: userName,
      password: contraseña,
      email: mail,
      firstName: firstName,
      lastName: lastName,
      accountType: accountType
    }),
  });
  return await response.json();
}
