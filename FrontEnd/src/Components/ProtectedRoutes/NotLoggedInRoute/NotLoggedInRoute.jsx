import React from 'react'
import { Redirect, Route } from 'react-router-dom'

function NotLoggedIn({component: Component, ...restOfProps},props) {
    const isLoggedIn = restOfProps.isLoggedIn

    return(
        <Route
            {...restOfProps}
            render={(props) => 
                (!isLoggedIn ? <Component {...props}/> : <Redirect to="/"/>)
            }
        />
    )
}

export default NotLoggedIn;