import React from 'react';
import { render } from 'react-dom';
import './Navbar.css';

class Navbar extends React.Component{
	render() {
		return (
		<div className="Navbar">
		<ul id="Navbar-list">
			<li><a href="#">Home</a></li>
		</ul>
		</div>
		);
	}
}

export default Navbar;
