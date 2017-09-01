import React, { Component} from 'react';
import { Link } from 'react-router-dom';

function Header() {
	return (
		<div className="row">
	 		<div className="row">
	 			<div className="col-lg-8">
					<h1 style={{verticalAlign: "bottom"}}>Dashboard</h1>
				</div>
				<div className="col-lg-2">
					<Link style={{verticalAlign: "bottom"}} to='/'>View campuses</Link>
				</div>
				<div className="col-lg-2">
					<Link style={{verticalAlign: "bottom"}} to='/students'>View students</Link>
				</div>
			</div>
			<hr />
		</div>

		);
}

export default Header;