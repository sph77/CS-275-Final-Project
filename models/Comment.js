const Sequelize = require('sequelize');
const db = require('../config/database');

// Model per comment
const Comment = db.define('comments', {
   crn: {
      type: Sequelize.INTEGER,
      primaryKey: true
   },
   data: {
      type: Sequelize.STRING
   }
});

module.exports = Comment;
