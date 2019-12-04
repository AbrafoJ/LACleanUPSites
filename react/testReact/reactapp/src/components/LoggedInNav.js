import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../store/actions/authActions'

const LoggedInNav = (props) => {
    return (
        <ul className="right">
            <li><NavLink to='/main'>Main</NavLink></li>
            <li><NavLink to='/favorites'><div onClick={this.props.toggleShowProjects} ></div>Favorites</NavLink></li>
            <li><a onClick={props.signOut}>Log Out</a></li>
            <li><NavLink to='/' className='btn btn-floating green lighten-1'>
            {String(props.auth.first_name).toUpperCase().charAt(0)+String(props.auth.last_name).toUpperCase().charAt(0)}
            </NavLink></li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(LoggedInNav)