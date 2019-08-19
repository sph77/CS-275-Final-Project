const express = require('express');
const router = express.Router();
const db = require('../config/database');
const course = require('../models/Course');
const sequelize = require('sequelize');

router.get("/", (req, res) => {
   course.findAll()
      .then(courses => res.status(200).send(courses))
      .catch(err => console.log(err))
});

module.exports = router;
