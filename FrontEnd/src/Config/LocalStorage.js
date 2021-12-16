export function setDataInLocalStorage(user, token) {
  localStorage.setItem("isLoggedIn", true);
  localStorage.setItem("name", user.firstName);
  localStorage.setItem("userName", user.userName);
  localStorage.setItem("token", token);
}

export function clearLocalStorage(){
    localStorage.clear();
}

export function changeNameInLocalStorage(name){
    localStorage.setItem("name",name)
}