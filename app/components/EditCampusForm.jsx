import React, { Component } from 'react';
import { connect } from 'react-redux';
import { putCampus } from '../store.js';

function EditCampusForm(props) {
	const currentCampus = props.currentCampus;
	console.log('in EditCampusForm', currentCampus);

	return (
			<div className="row">
	        <h2>Edit Campus</h2>
	        <form className="form-horizontal" onSubmit={props.handleSubmit}>
	          <div className="form-group">
	            <label className="control-label col-sm-2" htmlFor="name">Name:</label>
	            <div className="col-sm-10">
	              <input type="text" className="form-control" id="name" defaultValue={currentCampus.name} name="name" onChange={props.handleChange}/>
	            </div>
	          </div>
	          <div className="form-group">
	            <label className="control-label col-sm-2" htmlFor="url">Image URL:</label>
	            <div className="col-sm-10">          
	              <input type="url" className="form-control" id="url" defaultValue={currentCampus.image} name="imageUrl" onChange={props.handleChange}/>
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
	function matchesId(campus) {
		return campus.id == id;
	}
	const idx = state.campuses.findIndex(matchesId);
	console.log('id of campus in form', id);
	console.log('index of campus in form', idx);
	console.log('campus in form', state.campuses[idx]);

 	return {
 		currentCampus: state.campuses[idx]
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
			const image = event.target.imageUrl.value;
			console.log('submit name', event.target.name.value);
			console.log('submit image', event.target.imageUrl.value);
			const editCampusThunk = putCampus(id, {name: name, image: image});
			dispatch(editCampusThunk);
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCampusForm);