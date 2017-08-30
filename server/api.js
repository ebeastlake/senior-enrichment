'use strict'
const api = require('express').Router()
const db = require('../db')

const Campus = db.models.campus;
const Student = db.models.student;

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
// api.get('/hello', (req, res) => res.send({hello: 'world'}))

api.route('/campuses')
	// get all campuses (Campus model)
	.get(function(req, res) {
		Campus.findAll()
		.then(campuses => res.status(200).json(campuses));
	})

	// post new campus (Campus model)
	.post(function(req, res) {
		const image = req.body.image ? req.body.image : null;
		Campus.create({name: req.body.name, image: image})
		.then(campus => res.status(201).json(campus));
	});

api.route('/campuses/:id')
	// get campus by id (Campus model)
	.get(function(req, res) {
		console.log('in the get request!', req.params.id);
		Campus.findById(req.params.id)
		.then(campus => res.status(200).json(campus));
	})

	// update campus info for one campus (Campus model)
	.put(function(req, res) {
		const currentTime = new Date();
		Campus.update({updatedAt: currentTime}, {where: {id: req.params.id}})
		.then(numAndData => res.sendStatus(204));
	})

	// delete a campus (Campus model)
	.delete(function(req, res) {
		Campus.destroy({where: {id: req.params.id}})
		.then(campus => res.sendStatus(204));
	});

api.route('/students')
	// get all students (Student model)
	.get(function(req, res) {
		Student.findAll()
		.then(students => res.status(200).json(students));
	})

	// NOT WORKING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	// post new student (Student model)
	.post(function(req, res) {
		Student.create({name: req.body.name, email: req.body.email, campusId: req.body.campus})
		.then(student => res.sendStatus(201))
	})

api.route('/students/:id')
	// get a student by id (Student model)
	.get(function(req, res) {
		Student.findById(req.params.id)
		.then(student => res.status(200).json(student));
	})

	// update student info for one student (Student model)
	.put(function(req, res) {
		const currentTime = new Date();
		Student.update({updatedAt: currentTime}, {where: {id: req.params.id}})
		.then(numAndData => res.sendStatus(204));
	})

	// delete a student (Student model)
	.delete(function(req, res) {
		Student.destroy({where: {id: req.params.id}})
		.then(() => res.sendStatus(204));
	});

module.exports = api