import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import axios from 'axios';

// INITIAL STATE

const initialState = {
	campuses: [],
	students: [],
	newStudentEntry: {},
	newCampusEntry: {}
}

// ACTION TYPES

const GET_CAMPUSES = 'GET_CAMPUSES';
const ADD_CAMPUS = 'ADD_CAMPUS';
const EDIT_CAMPUS = 'EDIT_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const GET_STUDENTS = 'GET_STUDENTS';
const ADD_STUDENT = 'ADD_STUDENT';
const EDIT_STUDENT = 'EDIT_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';

// ACTION CREATORS

export function getCampuses(campuses) {
	const action = {type: GET_CAMPUSES, campuses};
	return action;
}

export function addCampus(campus) {
	const action = {type: ADD_CAMPUS, campus};
	return action;
}

export function editCampus(campus) {
	const action = {type: EDIT_CAMPUS, campus};
	return action;
}

export function deleteCampus(campus) {
	const action = {type: DELETE_CAMPUS, campus}
	return action;
}

export function getStudents(students) {
	const action = {type: GET_STUDENTS, students};
	return action;
}

export function addStudent(student) {
	const action = {type: ADD_STUDENT, student};
	return action;
}

export function editStudent(student) {
	const action = {type: EDIT_STUDENT, student};
	return action;
}

export function deleteStudent(student) {
	const action = {type: DELETE_STUDENT, student};
	return action;
}

// THUNK CREATORS

export function fetchCampuses() {
	return function thunk(dispatch) {
		return axios.get('/api/campuses')
		.then(res => res.data) 
		.then(campuses => {
			const action = getCampuses(campuses);
			dispatch(action);
		})
	}
}

export function postCampus(campus) {
	return function thunk(dispatch) {
		return axios.post('/api/campuses', campus)
			.then(res => res.data)
			.then(newCampus => {
				const action = addCampus(newCampus);
				dispatch(action);
			});
	}
}

export function putCampus(campus) {
	return function thunk(dispatch) {
		return axios.put(`/api/campuses/${campus.id}`, campus)
			.then(res => res.data)
			.then(campus => {
				const action = editCampus(campus);
				dispatch(action);
			});
	}
}

export function destroyCampus(campus) {
	return function thunk(dispatch) {
		return axios.delete(`/api/campuses/${campus.id}`, campus)
			.then(res => res.data)
			.then(campus => {
				const action = deleteCampus(campus);
				dispatch(action);
			})
	}
}

export function fetchStudents() {
	return function thunk(dispatch) {
		return axios.get('/api/students')
		.then(res => res.data) 
		.then(students => {
			const action = getStudents(students);
			dispatch(action);
		})
	}
}

export function postStudent(student) {
	return function thunk(dispatch) {
		return axios.post('/api/students', student)
			.then(res => res.data)
			.then(newStudent => {
				const action = addStudent(newStudent);
				dispatch(action);
			});
	}
}

export function putStudent(student) {
	return function thunk(dispatch) {
		return axios.put(`/api/students/${student.id}`, student)
			.then(res => res.data)
			.then(student => {
				const action = editStudent(student);
				dispatch(action);
			});
	}
}

export function destroyStudent(student) {
	return function thunk(dispatch) {
		return axios.delete(`/api/students/${student.id}`, student)
			.then(res => res.data)
			.then(student => {
				const action = deleteStudent(student);
				dispatch(action);
			})
	}
}

// REDUCER

// const GET_CAMPUSES = 'GET_CAMPUSES';
// const ADD_CAMPUS = 'ADD_CAMPUS';
// const EDIT_CAMPUS = 'EDIT_CAMPUS';
// const DELETE_CAMPUS = 'DELETE_CAMPUS';
// const GET_STUDENTS = 'GET_STUDENTS';
// const ADD_STUDENT = 'ADD_STUDENT';
// const EDIT_STUDENT = 'EDIT_STUDENT';
// const DELETE_STUDENT = 'DELETE_STUDENT';

function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_CAMPUSES:
			return {
				...state,
				campuses: action.campuses
			};
		case ADD_CAMPUS:
			return {
				...state,
				campus: action.campus
			};
		case EDIT_CAMPUS:
			return {
				...state,
				campus: action.campus
			};
		case DELETE_CAMPUS:
			return {
				...state,
				campus: action.campus
			};
		case GET_STUDENTS:
			return {
				...state,
				students: action.students
			};
		case ADD_STUDENT:
			return {
				...state,
				student: action.student
			};
		case EDIT_STUDENT:
			return {
				...state,
				student: action.student
			};
		case DELETE_STUDENT:
			return {
				...state,
				student: action.student
			};
		default:
      		return state;
	}
}

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()))
