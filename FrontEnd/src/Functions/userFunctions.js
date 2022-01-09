import { obtainUserData} from "../services/userServices";

export const getPrivilege = async (token) => {
  if (token !== null) {
    try{
    const userData = await obtainUserData(token);
    if (userData.status !== "Error") {
      return (userData.data.user.accountType === "Cuenta Empresarial");
    } else {
      throw new Error(userData.message);
    }
    }catch(e){
      console.log(e.message)
      return false
    }
  } else {
    return false;
  }
};

export const loadUserData = async (token, form, setForm) => {
  obtainUserData(token).then((userData) => {
    if (userData.status !== "Error")
      setForm({
        ...form,
        firstName: userData.data.user.firstName,
        lastName: userData.data.user.lastName,
        mail: userData.data.user.mail,
        username: userData.data.user.username,
        accountType: userData.data.user.accountType,
      });
    else throw new Error(userData.message);
  });
};
