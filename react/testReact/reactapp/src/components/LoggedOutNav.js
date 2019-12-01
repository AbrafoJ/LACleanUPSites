import React from 'react'
import { NavLink } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

const LoggedOutNav = () => {
    return (
        <ul className="right">
            <li><NavLink to='/login'>Log in</NavLink></li>
            <Redirect to='/login'/>
        </ul>
    )
}

export default LoggedOutNav