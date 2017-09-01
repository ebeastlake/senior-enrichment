import React, { Component} from 'react';
import { Link } from 'react-router-dom';

function Header() {
	return (
		<div className="row">
	 		<div className="row">
	 			<div className="col-lg-8">
					<h1 style={{margin: '30px 0 0 25px'}}>Dashboard</h1>
				</div>
				<div className="col-lg-2" style={{margin: '35px 0 0 0'}}>
					<Link to='/'>View campuses</Link>
				</div>
				<div className="col-lg-2" style={{margin: '35px 0 0 0'}}>
					<Link to='/students'>View students</Link>
				</div>
			</div>
			<hr />
		</div>

		);
}

export default Header;