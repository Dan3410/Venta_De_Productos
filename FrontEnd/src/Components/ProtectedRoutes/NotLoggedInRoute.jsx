import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getIsLoggedIn} from '../../Config/LocalStorage/LocalStorage'

function NotLoggedInRoute({component: Component, ...restOfProps}) {
    const isLoggedIn = getIsLoggedIn()

    useEffect(() => {
    },[])

    return(
        <Route
            {...restOfProps}
            render={(props) => 
                (!isLoggedIn ? <Component {...props}/> : <Redirect to="/"/>)
            }
        />
    )
}

export default NotLoggedInRoute;