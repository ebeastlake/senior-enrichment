import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import {getCampuses, destroyCampus} from '../store.js';

function AllCampuses(props) {
	return (
			<div className="row">

			{/*render ALL_CAMPUSES*/}
			{
				props.campuses.map(campus => {
					return (
						<div key={campus.id} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
				          <div className="panel panel-info">
				            <div className="panel-heading">
				              <div className="row">
				              	<div className="col-xs-3">
				              		<div style={{width: '70', height:'70', overflow: 'hidden'}}>
        										<img style={{width: '100%'}} src={campus.image} />
      										</div>
												</div>
												<div className="col-xs-9 text-right">
						  							<h2>{campus.name}</h2>
						  							<h6>Location, Space</h6>
												</div>
				              </div>
				            </div>
				            <div>
				              <div className="panel-footer">
				              	<div className="row">
					              	<div className="col-xs-9">
					              		<Link to={`/campus/${campus.id}`}>View or edit campus</Link>
					              	</div>
					              	<div className="col-xs-3">
					              		<a onClick={()=>{props.handleDelete(campus.id)}}>Delete</a>
					              	</div>
					              </div>
				              </div>
				            </div>
				          </div>
				        </div>
						);
				})
			}

		{/*add ADD_CAMPUS button*/}
		        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
		          <div className="panel panel-warning">
			          <Link to="/campus/add">
			            <div className="panel-heading">
			              <div className="row">
			              	<div className="col-xs-3">
  											<span className="glyphicon glyphicon-plus" style={{fontSize: '85px'}}></span>
											</div>
											<div className="col-xs-9 text-right">
					  							<h2>Add campus</h2>
											</div>
							      </div>
							    </div>
							  </Link>
							  <div className="panel-footer">
							      
							  </div>
							</div>
						</div>
		  </div>
	);
};

const mapStateToProps = function(state) {
 	return {
 		campuses: state.campuses
 	};
};

const mapDispatchToProps = function(dispatch) {
	return {
		handleDelete: function(id) {
			const result = confirm('Are you sure you want to delete this campus?');
			if (result) {
    		const deleteThunk = destroyCampus(id);
    		dispatch(deleteThunk);
			}
		}
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllCampuses));
