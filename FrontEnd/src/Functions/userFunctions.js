import { obtainUserDataByUsername } from "../services/userServices";

export const getPrivilege = async (username, token) => {
  console.log("getPrivilege")
  if(username !== null && token !== null){
  const userData = await obtainUserDataByUsername(username, token);
  if (userData.status !== "Error") {
    return userData.data.user.accountType === "Cuenta Empresarial";
  } else {
    return false;
  }
  }else{
    return false
  }
};

export const loadUserData = async (
  username,
  token,
  form,
  setForm,
) => {
  obtainUserDataByUsername(username, token).then((userData) => {
    if (userData.status !== "Error")
      setForm({
        ...form,
        firstName: userData.data.user.firstName,
        lastName: userData.data.user.lastName,
        mail: userData.data.user.mail,
        userName: userData.data.user.userName,
        accountType: userData.data.user.accountType,
      });
    else throw new Error(userData.message);
  });
};
