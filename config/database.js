const Sequelize = require('sequelize');
module.exports = new Sequelize('sqlite:./database/database.db');
