import React from 'react'
import { NavLink } from 'react-router-dom'

const LoggedInNav = () => {
    return (
        <ul className="right">
            <li><NavLink to='/login'>Log In</NavLink></li>
        </ul>
    )
}

export default LoggedInNav