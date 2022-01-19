import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getIsLoggedIn, getUsername } from '../../Config/LocalStorage/LocalStorage'

function LoggedInRoute({component: Component, ...restOfProps}) {
    const isLoggedIn = getIsLoggedIn()
    const username = getUsername()

    useEffect(() => {
    },[])

    return(
        <Route
            {...restOfProps}
            render={(props) => 
                (username !== props.match.params.username) ? <Redirect to= "/"/> :
                (isLoggedIn ? <Component {...props}/> : <Redirect to="/Login"/>)
            }
        />
    )
}

export default LoggedInRoute;