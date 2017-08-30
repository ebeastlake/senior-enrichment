import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getStudents} from '../store.js'; 

function AllStudents(props) {
	console.log("currentCampus in allStudents",props.campusId);
	const campusId = props.campusId;
	function matchesCampus(student) {
		return student.campusId == campusId;
	}
	const currentStudents = campusId ? props.students.filter(matchesCampus) : props.students;

	return (
		<div className="row">
			<table className='table'>
				<thead>
				    <tr>
			          <th></th>
			          <th>Name</th>
			          <th>Email</th>
			          <th>Campus</th>
				    </tr>
				</thead>
				<tbody>
				{
					currentStudents.map(student => (
						<tr key={student.id}>
				          	<td>
				            	<button className="btn btn-default btn-xs">
				              		<span className="glyphicon glyphicon-play"></span>
				               	</button>
				            </td>
				            <td>{student.name}</td>
				            <td>{student.email}</td>
				            <td>{student.campusId}</td>
			        	</tr>
					))
				}
				</tbody>
			</table>
		</div>
	);
};

const mapStateToProps = function(state) {
 	return {
 		students: state.students
 	};
 };

export default connect(mapStateToProps)(AllStudents);