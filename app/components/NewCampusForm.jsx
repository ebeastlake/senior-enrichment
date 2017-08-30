import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postCampus } from '../store.js';

function NewCampusForm(props) {

	console.log('in NewCampusForm');

	return (
			<div className="row">
	        <h2>Add Campus</h2>
	        <form className="form-horizontal" onSubmit={props.handleSubmit}>
	          <div className="form-group">
	            <label className="control-label col-sm-2" htmlFor="name">Name:</label>
	            <div className="col-sm-10">
	              <input type="text" className="form-control" id="name" placeholder="Enter name" name="name" onChange={props.handleChange}/>
	            </div>
	          </div>
	          <div className="form-group">
	            <label className="control-label col-sm-2" htmlFor="url">Image URL:</label>
	            <div className="col-sm-10">          
	              <input type="url" className="form-control" id="url" placeholder="Enter image URL" name="imageUrl" onChange={props.handleChange}/>
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

const mapStateToProps = function(state) {
 	return {
 		campuses: state.campuses
 	};
};

const mapDispatchToProps = function(dispatch) {
	return {
		handleChange: function(event) {
			console.log(event.target.id);
			console.log(event.target.value);
		}, 
		handleSubmit: function(event) {
			event.preventDefault();
			const name = event.target.name.value;
			const imageUrl = event.target.imageUrl.value;
			console.log('submit name', event.target.name.value);
			console.log('submit imageUrl', event.target.imageUrl.value);
			const addCampusThunk = postCampus({name: name, image: imageUrl});
			dispatch(addCampusThunk);
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCampusForm);