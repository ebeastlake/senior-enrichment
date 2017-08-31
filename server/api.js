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
		Campus.findById(req.params.id)
		.then(campus => {
			res.status(200).json(campus)
		});
	})

	// update campus info for one campus (Campus model)
	.put(function(req, res) {
		Campus.update({
			name: req.body.name,
			image: req.body.image
		}, 
			{
				where: {id: req.params.id}, 
				returning: true,
				plain: true
			})
		.then(data => {
			const campus = data[1].dataValues;
			console.log('in put request', campus);
			res.status(200).json(campus);
		})
	})


	// delete a campus (Campus model)
	.delete(function(req, res) {
		const id = req.params.id;
		Campus.destroy({where: {id: id}})
		.then(() => res.status(200).json(id));
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
		console.log('in route');
		console.log('name', req.body.name);
		console.log('email', req.body.email);
		console.log('campusId', req.body.campusId);
		const campusId = req.body.campusId ? req.body.campusId : null;
		console.log('after ternary', campusId);
		Student.create({name: req.body.name, email: req.body.email})
		.then(student => student.setCampus(campusId))
		.then(student => res.sendStatus(201).json(student))
		.catch(console.log)
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
		Student.update({
			name: req.body.name, 
			email: req.body.email, 
			campusId: req.body.campus}, 
			{
				where: {id: req.params.id}, 
				// return the element you update
				returning: true,
				plain: true
			})
		.then(data => {
			const student = data[1].dataValues;
			console.log('in put request', student);
			res.status(200).json(student);
		});
	})

	// delete a student (Student model)
	.delete(function(req, res) {
		const id = req.params.id;
		Student.destroy({where: {id: id}})
		.then(() => res.status(200).json(id));
	});

module.exports = api