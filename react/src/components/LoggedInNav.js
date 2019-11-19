import React from 'react'
import { NavLink } from 'react-router-dom'

const LoggedInNav = () => {
    return (
        <ul className="right">
            <li><NavLink to='/main'>Main</NavLink></li>
            <li><NavLink to='/favorites'>Favorites</NavLink></li>
            <li><NavLink to='/'>Log Out</NavLink></li>
            <li><NavLink to='/' className='btn btn-floating green lighten-1'>MW</NavLink></li>
        </ul>
    )
}

export default LoggedInNav