import 'bootstrap/dist/css/bootstrap.css';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import React, { Component} from 'react';
import AllCampuses from './AllCampuses.jsx';
import AllStudents from './AllStudents.jsx';
import NewCampusForm from './NewCampusForm.jsx';
import SingleCampus from './SingleCampus.jsx';
import EditStudentForm from './EditStudentForm.jsx';
import EditCampusForm from './EditCampusForm.jsx';
import Navbar from './Navbar.jsx'
import Sidebar from './Sidebar.jsx'
import Header from './Header.jsx'
import { fetchCampuses, fetchStudents } from '../store.js';
import { connect } from 'react-redux';

// abstract these into a Routes component? (probably not)

class Root extends Component {

  componentDidMount() {
    this.props.fetchInitialData();
  }

	render() {
    console.log('in root', Route.path);
		return (
  			<div>
  				<Navbar />
      		<div className="container">
      			<Header />
            <Switch>
              <Route exact path="/campus/add" component={NewCampusForm} />
              <Route exact path="/campus/edit/:id" component={EditCampusForm} />
              <Route exact path="/campus/:id" component={SingleCampus} />
              <Route exact path="/students" component={AllStudents} />
              <Route exact path="/student/:id" component={EditStudentForm} />
        			<Route component={AllCampuses} />
            </Switch>
    			</div>
        </div>
			);
	}
}

// same as auther Routes.js

const mapStateToProps = null;

const mapDispatchToProps = function(dispatch) {
  return {
    fetchInitialData: function() {
      const campusesThunk = fetchCampuses();
      const studentsThunk = fetchStudents();
      dispatch(campusesThunk);
      dispatch(studentsThunk);
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));