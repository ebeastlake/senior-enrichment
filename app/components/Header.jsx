import React, { Component} from 'react';
import { Link } from 'react-router-dom';

function Header() {
	return (
		<div className="row">
	 		<div className="col-lg-12">
				<div className="page-header">
					<h1>Dashboard</h1>
					<Link to='/'>View campuses</Link>
					<Link to='/students'>View students</Link>
				</div>
			</div>
		</div>

		);
}

export default Header;