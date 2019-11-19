import React from 'react';
import { Link } from 'react-router-dom'
import './Navbar.css';
import LoggedInNav from './LoggedInNav'
import LoggedOutNav from './LoggedOutNav'
import {  Logo } from "/Users/flo/Desktop/491/testReact/testapp/src/Utils.js";
import MasterBoard from './MasterBoard';

const Navbar = () => {
	return (
		<nav className="nav-wrapper grey darken-2">
			<div className="container">
				<Link to='/' className='brand-logo'></Link> 
				<LoggedInNav/>
				<LoggedOutNav/>
			</div>
		</nav>
	)
}
export default Navbar;
