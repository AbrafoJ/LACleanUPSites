import React from 'react'
import { render } from 'react-dom'
//import './Navbar.css'
import styled from 'styled-components'

const Container = styled.div.attrs({
    className: 'container',
});

const Nav = styled.nav.attrs({
  className: 'navbar navbar-expand-lg navbar-dark bg-dark',
});
//	margin-bottom: 20 px;

class Navbar extends React.Component{
	render() {
		return (
			<Container>
			    <Nav>
			    </Nav>
			</Container>
		)
	}
}

export default Navbar;
