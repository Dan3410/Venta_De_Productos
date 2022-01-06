export const checkLengthPassword = (password) => {
  if (password.length < 6) {
    throw new Error("La contraseña debe tener al menos 6 caracteres");
  } else if (password.length > 14) {
    throw new Error("La contraseña debe tener menos de 15 caracteres");
  }
  return;
};

export const checkPasswordAndConfirmPasswordFieldFilled = (
  password,
  confirmPassword
) => {
  if (password !== "" && confirmPassword === "") {
    throw new Error("Si desea modificar la contraseña, debe confirmarla");
  }
  if (password === "" && confirmPassword !== "") {
    throw new Error(
      "Ambos campos deben estar completados si quiere cambiar la contraseña"
    );
  }
  return;
};

export const checkEqualPasswordAndConfirmPasswordFields = (
  password,
  confirmpassword
) => {
  if (password !== confirmpassword) {
    throw new Error(
      "El valor ingresado en contraseña y confirmar contraseña deben ser iguales"
    );
  }
  return;
};
export const checkPasswordNotEmptyLogin = (password) => {
    if (password === "") throw new Error("Ingrese la contraseña");
    return;
  };

export const checkUsernameNotEmptyLogin = (password) => {
    if (password === "") throw new Error("Ingrese el nombre de usuario");
    return;
  };

export const checkNoEmptyField = (form) => {
  if (Object.values(form).indexOf("") > -1) {
    throw new Error("Debe llenar todos los campos");
  }
  return;
};

export const checkFirstNameNotEmpty = (firstName) => {
  if (firstName === "") throw new Error("El campo nombre no puede estar vacío");
  return;
};
export const checkLastNameNotEmpty = (lastName) => {
  if (lastName === "")
    throw new Error("El campo apellido no puede estar vacío");
  return;
};
export const checkUsernameNotEmpty = (username) => {
    if (username === "")
        throw new Error("El campo username no puede estar vacío");
    return;
}

export const checkMailNotEmpty = (email) => {
    if (email === "")
        throw new Error("El campo email no puede estar vacío");
    return;
}
export const checkMailFormat = (email) => {
  let re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email)) throw new Error("Formato del email invalido");
  return;
};
