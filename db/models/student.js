'use strict';
var Sequelize = require('sequelize');
var db = require('../index.js');
var Campus = require('./campus.js');

module.exports = db.define('student', {
  name: {
  	type: Sequelize.STRING,
  	allowNull: false
  }, 
  email: {
  	type: Sequelize.STRING, 
  	allowNull: false,
  	unique: true,
  	validate: {
  		isEmail: true,
  	}
  }
}, {
  defaultScope: {
    include: [{model: Campus}]
  }
});
