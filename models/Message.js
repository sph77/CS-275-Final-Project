const Sequelize = require('sequelize');
const db = require('../config/database');

// Model per course
const Message = db.define('messages', {
   crn: {
	  type: Sequelize.INTEGER,
	  primaryKey: true
   },
   user: {
      type: Sequelize.STRING,
   },
   message: {
      type: Sequelize.STRING
   },
   time: {
      type: Sequelize.TIME
   }
});

module.exports = Message;