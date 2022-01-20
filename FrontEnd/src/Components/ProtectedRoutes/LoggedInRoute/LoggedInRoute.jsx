import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'

function LoggedIn({component: Component, ...restOfProps}) {
    const isLoggedIn = restOfProps.isLoggedIn
    const username = restOfProps.username

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

export default LoggedIn;