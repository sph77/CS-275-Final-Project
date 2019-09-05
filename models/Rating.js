const Sequelize = require('sequelize');
const db = require('../config/database');

// Model per rating
const Rating = db.define('ratings', {
   crn: {
      type: Sequelize.INTEGER,
      primaryKey: true
   },
   rating: {
      type: Sequelize.INTEGER
   },
   count: {
      type: Sequelize.INTEGER
   }
});

module.exports = Rating;
