import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllStudents from './AllStudents.jsx';

// should there be a current campus?

function SingleCampus(props) {
	const currentCampus = props.currentCampus;

	console.log('currentCampus in SingleCampus', props.currentCampus)

	return (
			<div className="row">
		        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
		          <div className="panel panel-info">
		            <div className="panel-heading">
		              <div className="row">
		              	<div className="col-xs-3">
  							{currentCampus.image}
						</div>
						<div className="col-xs-9 text-right">
  							<h2>{currentCampus.name}</h2>
  							<h6>Location, Space</h6>
						</div>
		              </div>
		            </div>
		            <a href="#">
		              <div className="panel-footer">
		                <div>View campus</div>
		              </div>
		            </a>
		          </div>
		        </div>
		        <div className="col-lg-9 col-md-6 col-sm-6 col-xs-12">
		           <AllStudents campusId={currentCampus.id}/>
		        </div>
		    </div>
	);
}

const mapStateToProps = function(state, ownProps) {
	const id = ownProps.match.params.id;
	function matchesId(campus) {
		return campus.id == id;
	}
	const idx = state.campuses.findIndex(matchesId);

 	return {
 		currentCampus: state.campuses[idx]
 	};
};

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus);