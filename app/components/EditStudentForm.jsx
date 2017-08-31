import React, { Component } from 'react';
import { connect } from 'react-redux';
import { putStudent } from '../store.js';

function EditStudentForm(props) {
	const currentStudent = props.currentStudent;
	console.log('in EditStudentForm', currentStudent);

	return (
			<div className="row">
	        <h2>Edit Student</h2>
	        <form className="form-horizontal" onSubmit={props.handleSubmit}>
	          <div className="form-group">
	            <label className="control-label col-sm-2" htmlFor="name">Name:</label>
	            <div className="col-sm-10">
	              <input type="text" className="form-control" id="name" defaultValue={currentStudent.name} name="name" onChange={props.handleChange}/>
	            </div>
	          </div>
	          <div className="form-group">
	            <label className="control-label col-sm-2" htmlFor="email">Email:</label>
	            <div className="col-sm-10">          
	              <input type="email" className="form-control" id="email" defaultValue={currentStudent.email} name="email" onChange={props.handleChange}/>
	            </div>
	          </div>
	          <div className="form-group">
          		<label className="control-label col-sm-2" htmlFor="campus">Select campus:</label>
          		<div className="col-sm-10"> 
	          		<select name="campus" defaultValue={currentStudent.campusId}> {
	          			props.campuses.map(campus => (<option key={campus.id} value={campus.id}>{campus.name}</option>))
	          		}
					</select>
				</div>
			</div>
	          <div className="form-group">        
	            <div className="col-sm-offset-2 col-sm-10">
	              <button type="submit" className="btn btn-default">Submit</button>
	            </div>
	          </div>
	        </form>
	      </div>
	);
}

const mapStateToProps = function(state, ownProps) {
	const id = ownProps.match.params.id;
	function matchesId(student) {
		return student.id == id;
	}
	const idx = state.students.findIndex(matchesId);
	console.log('id of student in form', id);
	console.log('index of student in form', idx);
	console.log('student in form', state.students[idx]);

 	return {
 		currentStudent: state.students[idx],
 		campuses: state.campuses
 	};
};

const mapDispatchToProps = function(dispatch, ownProps) {
	const id = ownProps.match.params.id;
	return {
		handleChange: function(event) {
			console.log(event.target.id);
			console.log(event.target.value);
		}, 
		handleSubmit: function(event) {
			event.preventDefault();
			console.log('trying to submit');
			const name = event.target.name.value;
			const email = event.target.email.value;
			const campus = event.target.campus.value;
			console.log('submit name', event.target.name.value);
			console.log('submit email', event.target.email.value);
			console.log('submit campus', event.target.campus.value);
			const editStudentThunk = putStudent(id, {name: name, email: email, campus: campus});
			dispatch(editStudentThunk);
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditStudentForm);