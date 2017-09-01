import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getStudents, postStudent, destroyStudent} from '../store.js'; 



function AllStudents(props) {
	const campusId = props.campusId;
	function matchesCampus(student) {
		return student.campusId == campusId;
	}
	const currentStudents = campusId ? props.students.filter(matchesCampus) : props.students;
	console.log("currentStudents in allStudents", currentStudents);
	return (
		<div>
			<div className="row">
				<form className="form-inline" onSubmit={(event) => {props.handleSubmit(event, campusId)}}>
		        <div className="form-group" style={{margin: '0px 30px 0px 8px'}}>
		          <label htmlFor="name" style={{margin: '0px 10px 0px 0px'}}>Name:</label>
		          <input type="text" className="form-control" id="name" onChange={props.handleChange}/>
		        </div>
		        <div className="form-group" style={{margin: '0px 30px 0px 0px'}}>
		          <label htmlFor="email" style={{margin: '0px 10px 0px 0px'}}>Email:</label>
		          <input type="email" className="form-control" id="email" onChange={props.handleChange} style={{width: '300px'}}/>
		        </div>
		          { campusId ? 
		          	null
		          	:
		          	<div className="form-group" style={{margin: '0px 30px 0px 8px'}}>
		          		<label htmlFor="campus" style={{margin: '0px 10px 0px 0px'}}>Select campus:</label>
		          		<select name="campus"> {
		          			props.campuses.map(campus => <option key={campus.id} value={campus.id}>{campus.name}</option>)
		          		}
						</select>
					</div>
		      		}
		        <button type="submit" className="btn btn-default">Add student</button>
		      </form>
			</div>
			<div className="row">
				<table className='table'>
					<thead>
					    <tr>
				          <th>Name</th>
				          <th>Email</th>
				          { campusId ? 
					            	null
					            	:
					            	<th>Campus</th>
					      }
				          <th></th>
					    </tr>
					</thead>
					<tbody>
					{
						currentStudents.map(student => {
							return (
							<tr key={student.id}>
					            <td>{student.name}</td>
					            <td>{student.email}</td> 
					            { campusId ? 
					            	null
					            	:
					            	<td>{student.campus.name}</td>
					            }
					            <td>
					            	<Link to={`/student/${student.id}`}>Edit</Link>
					            </td>
					            <td>
					            	<button className="btn btn-default btn-xs" onClick={() => {props.handleDelete(student.id)}}>
					              		<span>Delete</span>
					               	</button>
					            </td>
				        	</tr>
						)})
					}
					</tbody>
				</table>
			</div>
		</div>
	);
};

const mapStateToProps = function(state) {
 	return {
 		students: state.students,
 		campuses: state.campuses
 	};
};

const mapDispatchToProps = function(dispatch, ownProps) {

	return {
		handleDelete: function(id) {
			console.log(id);
			const result = confirm('Are you sure you want to delete this student?');
			if (result) {
    			const deleteThunk = destroyStudent(id);
    			dispatch(deleteThunk);
			}
		}, 
		handleEdit: function(id) {
			console.log('you want to edit', id);
		},
		handleChange: function(event) {
			console.log(event.target.id);
			console.log(event.target.value);
		}, 
		handleSubmit: function(event, id) {
			event.preventDefault();
			const name = event.target.name.value;
			const email = event.target.email.value;
			const campusId = id || event.target.campus.value; // from page or drop-down
			console.log('submit name', event.target.name.value);
			console.log('submit email', event.target.email.value);
			const addStudentThunk = postStudent({name: name, email: email, campusId: campusId});
			dispatch(addStudentThunk);
		}
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(AllStudents);