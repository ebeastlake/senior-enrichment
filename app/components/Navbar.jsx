import React, { Component } from 'react';
import {Link} from 'react-router-dom';

function Navbar(props) {
	return (
		<nav className="navbar navbar-default navbar-static-top" role="navigation" style={{marginBottom: 0}}>
			<div className="navbar-header">
				<Link className="navbar-brand" to="/index.html">Interplanetary Academy of JavaScript</Link>
			</div>
		</nav>
	);
}

export default Navbar;