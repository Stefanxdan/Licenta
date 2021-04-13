import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from "../contexts/authcontext"


export default function PrivateRoute({component: Component, ...rest}) {

    let { currentUser } = useAuth()

    return (
        <Route
            { ...rest}
            render={props =>{
                return currentUser ? <Component {...props} /> : <Redirect to="/login"/>
            }}
        ></Route>
    )
}
