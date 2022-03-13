import { obtainUserData } from "../api/userApi";

export const getPrivilege = async (token) => {
  if (token !== null) {
    try {
      const response = await obtainUserData(token);
      if (response.status === 200) {
        return response.user.accountType === "Cuenta Empresarial";
      } else {
        throw new Error(response.message);
      }
    } catch (e) {
      console.log("Error getting privilege");
      return false;
    }
  } else {
    return false;
  }
};

export const loadUserData = (token, form, setForm, setErrorMessage) => {
  obtainUserData(token).then((response) => {
    if (response.status === 200)
      setForm({
        ...form,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        mail: response.user.mail,
        username: response.user.username,
        accountType: response.user.accountType,
      });
    else
      switch (response.status) {
        default:
          setErrorMessage("Error retrieving Data");
          break;
      }
  });
};
