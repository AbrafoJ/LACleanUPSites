import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import LoggedInNav from './LoggedInNav'
import LoggedOutNav from './LoggedOutNav'
import { connect } from 'react-redux'


// ====================================================================================
// redux detects whenever we sign in or sign out and it will update in the root reducer
// now we need to access authentication in this navbar component because we only want to
// show certain links dependent on your authentication status
// 
// 1. connect to redux state
// 2. just give navbar rootReducer which will go into authReducer (which handles auth)
// ====================================================================================
const Navbar = (props) => { 
	// const { auth } = props;
	// const links = auth.uid ? <LoggedInNav /> : <LoggedOutNav /> if links is true, user is signed in, if not, user is signed out
	var bool = false;
	const links = bool ? <LoggedInNav /> : <LoggedOutNav />;
	return (
		<nav className="nav-wrapper blue-grey darken-3">
			<div className="container">
				<Link to='/' className='brand-logo'></Link> 
				{ links }
			</div>
		</nav>
	)
}
// ====================================================================================
// function that takes in the state,
// inside function we return an object which represents things we wanna attach to props
// ====================================================================================
const mapStateToProps = (state) => {
	console.log('NavBar mapStatetoProps hi',state);
	return {
		//auth: . . .
	}
}

// we want to map our state (status) to our props
export default connect(mapStateToProps)(Navbar);
