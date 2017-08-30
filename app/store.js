import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk

import history from './history';
import axios from 'axios'; // remove this later
import rootReducer from './reducers'; // not using this yet

// INITIAL STATE

const initialState = {
	campuses: [],
	students: [], 
	newCampus: {}
};

// ACTION TYPES

const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_STUDENTS = 'GET_STUDENTS';
const ADD_CAMPUS = 'ADD_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';

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

export function deleteCampus(campus) {
	const action = {type: DELETE_CAMPUS, campus}
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

function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_CAMPUSES: {
			return Object.assign({}, state, {campuses: action.campuses});
		}
		case GET_STUDENTS: {
			return Object.assign({}, state, {students: action.students});
		}
		// case GET_NEW_CAMPUS: {
		// 	return Object.assign({}, state, {newCampus: action.campus});
		// }
		case ADD_CAMPUS:
			const newCampusList = state.campuses.concat([action.campus]);
			return Object.assign({}, state, {campuses: newCampusList});
		default: {
			return state;
		}
	}
}

export default createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()));
