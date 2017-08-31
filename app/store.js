import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk

import history from './history';
import axios from 'axios'; // remove this later
import rootReducer from './reducers'; // not using this yet

// INITIAL STATE

const initialState = {
	campuses: [],
	students: []
};

// ACTION TYPES

const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_STUDENTS = 'GET_STUDENTS';
const ADD_CAMPUS = 'ADD_CAMPUS';
const ADD_STUDENT = 'ADD_STUDENT';
const EDIT_CAMPUS = 'EDIT_CAMPUS';
const EDIT_STUDENT = 'EDIT_STUDENT';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const DELETE_STUDENT = 'DELETE_STUDENT';

// ACTION CREATORS

export function getCampuses(campuses) {
	const action = {type: GET_CAMPUSES, campuses};
	return action;
}

export function getStudents(students) {
	const action = {type: GET_STUDENTS, students};
	return action;
}

export function addCampus(campus) {
	const action = {type: ADD_CAMPUS, campus};
	return action;
}

export function addStudent(student) {
	const action = {type: ADD_STUDENT, student};
	return action;
}

export function editCampus(campus) {
	const action = {type: EDIT_CAMPUS, campus};
	return action;
}

export function editStudent(student) {
	const action = {type: EDIT_STUDENT, student};
	return action;
}

export function deleteCampus(id) {
	const action = {type: DELETE_CAMPUS, id}
	return action;
}

export function deleteStudent(id) {
	const action = {type: DELETE_STUDENT, id}
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

export function postCampus(campus) {
	return function thunk(dispatch) {
		return axios.post('/api/campuses', campus)
			.then(res => res.data)
			.then(newCampus => {
				const action = addCampus(newCampus);
				dispatch(action);
			})
			.then(() => {
				history.push('/');
			})
	}
}

export function postStudent(student) {
	console.log('made the thunk');
	return function thunk(dispatch) {
		console.log('trying to post student')
		console.log('providing req.body', student)
		return axios.post('/api/students', student)
			.then(res => res.data)
			.then(newStudent => {
				console.log('from server', newStudent);
				const action = addStudent(newStudent);
				dispatch(action);
			});
			// need to push to history?
	}
}

export function putStudent(id, student) {
	//console.log('made the put thunk');
	return function thunk(dispatch) {
		//console.log('trying to put student')
		//console.log('providing req.body', student)
		return axios.put(`/api/students/${id}`, student)
			.then(res => res.data)
			.then(newStudent => {
				//console.log('after res.data', newStudent);
				const action = editStudent(newStudent);
				dispatch(action);
			})
			.then(() => {
				console.log('redirecting to campus', student.campus)
				console.log('history', history);
				console.log('previous url', document.referrer);
				history.push(`/campus/${student.campus}`); // do I need this?
			});
			// need to push to history?
	}
}

export function putCampus(id, campus) {
	//console.log('made the put thunk');
	return function thunk(dispatch) {
		//console.log('trying to put student')
		//console.log('providing req.body', student)
		return axios.put(`/api/campuses/${id}`, campus)
			.then(res => res.data)
			.then(newCampus => {
				//console.log('after res.data', newStudent);
				const action = editCampus(newCampus);
				dispatch(action);
			})
			.then(() => {
				history.push('/'); // do I need this?
			});
			// FIX BASED ON STUDENT
			// .then(() => {
			// 	console.log('redirecting to campus', student.campus)
			// 	console.log('history', history);
			// 	console.log('previous url', document.referrer);
			// 	history.push(`/campus/${student.campus}`); // do I need this?
			// });
			// need to push to history?
	}
}

export function destroyCampus(id) {
	return function thunk(dispatch) {
		return axios.delete(`/api/campuses/${id}`)
			.then(res => res.data)
			.then(id => {
				const action = deleteCampus(id);
				dispatch(action);
			})
			.then(() => {
				history.push('/'); // do I need this?
			})
	}
}

export function destroyStudent(id) {
	return function thunk(dispatch) {
		return axios.delete(`/api/students/${id}`)
			.then(res => res.data)
			.then(id => {
				console.log('id to delete', id);
				const action = deleteStudent(id);
				dispatch(action);
			})
			// .then(() => {
			// 	history.push('/'); // do I need this?
			// })
	}
}

function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_CAMPUSES: {
			return Object.assign({}, state, {campuses: action.campuses});
		}
		case GET_STUDENTS: {
			return Object.assign({}, state, {students: action.students});
		}
		case ADD_CAMPUS: {
			const newCampusList = state.campuses.concat([action.campus]);
			return Object.assign({}, state, {campuses: newCampusList});
		}
		case ADD_STUDENT: {
			const newStudentList = state.students.concat([action.student]);
			return Object.assign({}, state, {students: newStudentList});
		}
		case EDIT_STUDENT: {
			// console.log('trying to edit student', action.student);
			function matchesId(student) {
				return student.id == action.student.id;
			}
			const idx = state.students.findIndex(matchesId);
			// console.log('at index', idx);
			// copy the array and change one element at the index (doesn't mutate)
			const newStudentList = state.students.slice();
			newStudentList[idx] = action.student;
			// console.log('newStudentAfterModification', newStudentList[idx]);
			// console.log('newStudentListAfterModification', newStudentList);
			return Object.assign({}, state, {students: newStudentList});
		}
		case EDIT_CAMPUS: {
			console.log('trying to edit campus', action.campus);
			function matchesId(campus) {
				return campus.id == action.campus.id;
			}
			const idx = state.campuses.findIndex(matchesId);
			console.log('at index', idx);
			// copy the array and change one element at the index (doesn't mutate)
			const newCampusList = state.campuses.slice();
			newCampusList[idx] = action.campus;
			console.log('newStudentAfterModification', newCampusList[idx]);
			console.log('newStudentListAfterModification', newCampusList);
			return Object.assign({}, state, {campuses: newCampusList});
		}
		case DELETE_CAMPUS: {
			function matchesId(campus) {
				return campus.id == action.id;
			}
			const idx = state.campuses.findIndex(matchesId);
			// copy the array and remove one element at the index (doesn't mutate)
			const newCampusList = state.campuses.slice();
			newCampusList.splice(idx, 1);
			return Object.assign({}, state, {campuses: newCampusList});
		}
		case DELETE_STUDENT: {
			function matchesId(student) {
				return student.id == action.id;
			}
			const idx = state.students.findIndex(matchesId);
			// copy the array and remove one element at the index (doesn't mutate)
			const newStudentList = state.students.slice();
			newStudentList.splice(idx, 1);
			console.log(newStudentList);
			return Object.assign({}, state, {students: newStudentList});
		}
		default: {
			return state;
		}
	}
}

export default createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()));
