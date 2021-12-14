import React, { useState } from 'react';
import userContext from './context';

function GlobalContext({ children }) {
    const [isLoggedIn, setUserLogged] = useState(localStorage.getItem("logged"));
    const [name, setName] = useState(localStorage.getItem("name"));
    const [userName, setUserName] = useState(localStorage.getItem("userName"));
    const [token, setToken] = useState(localStorage.getItem("token"));
    const logInUserContext = (user,token) => {
        setUserLogged(true)
        setName(user.firstName);
        setUserName(user.userName);
        setToken(token)
    };

    const changeName = (firstName) => {
        setName(firstName)
    }

    const logOutUserContext = () => {
        setUserLogged(false)
        setName()
        setUserName();
    }

    return (
        <userContext.Provider
            value={{
                isLoggedIn,
                logInUserContext,
                logOutUserContext,
                changeName,
                name,
                userName,
                token
            }}>
            {children}
        </userContext.Provider>
    )
}

export default GlobalContext;