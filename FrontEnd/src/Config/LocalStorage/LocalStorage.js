export function setDataInLocalStorage(user, token) {
  localStorage.setItem("isLoggedIn", true);
  localStorage.setItem("name", user.firstName);
  localStorage.setItem("username", user.username);
  localStorage.setItem("token", token);
}

export function clearLocalStorage(){
    localStorage.clear();
}

export function changeNameInLocalStorage(name){
    localStorage.setItem("name",name)
}

export function getIsLoggedIn() {return localStorage.getItem("isLoggedIn") === "true"}
export function getName() {return localStorage.getItem("name") }
export function getUsername() {return localStorage.getItem("username")}
export function getToken() {return localStorage.getItem("token")}
