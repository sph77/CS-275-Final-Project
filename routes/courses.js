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

router.get("/:crn", (req, res) => {
   course.findAll({
      where: {
         crn: req.params.crn
      }
   })
   .then(courses => {
      if (courses.length != 1)
      {
         res.sendStatus(404);
      }
      else
      {
         res.status(200).render("course", {
            course: courses[0]
         });
      }
   })
   .catch(err => console.log(err))
});

module.exports = router;
