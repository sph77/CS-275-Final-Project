const Sequelize = require('sequelize');
const db = require('../config/database');

// Model per course
const Course = db.define('courses', {
   crn: {
      type: Sequelize.INTEGER,
      primaryKey: true
   },
   subject: {
      type: Sequelize.STRING
   },
   number: {
      type: Sequelize.INTEGER
   },
   title: {
      type: Sequelize.STRING
   },
   instructor: {
      type: Sequelize.STRING
   }
});

module.exports = Course;
