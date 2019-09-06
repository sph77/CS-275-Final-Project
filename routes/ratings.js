const express = require('express');
const router = express.Router();
const db = require('../config/database');
const rating = require('../models/Rating');
const sequelize = require('sequelize');

router.get("/", (req, res) => {
   rating.findAll()
      .then(ratings => res.status(200).send(ratings))
      .catch(err => console.log(err))
});

router.get("/:crn", (req, res) => {
   rating.findAll({
      where: {
         crn: req.params.crn
      }
   })
   .then(ratings => {
      if (ratings.length != 1)
      {
         res.sendStatus(404);
      }
      else
      {
         res.status(200).send(ratings[0]);
      }
   })
   .catch(err => console.log(err))
});

router.post("/:crn", (req, res) => {
   rating.findAll({
      where: {
         crn: req.params.crn
      }
   })
   .then(ratings => {
      if (ratings.length != 1)
      {
         res.sendStatus(404);
      }
      else
      {
         var ratingVal = ratings[0].rating;
	 var countVal = ratings[0].count;
	 countVal += 1;
	 ratingVal += parseInt(req.body.rating); 
	 rating.update( { rating: ratingVal, count: countVal }, { where: { crn: req.params.crn } })
	      .then(result => { res.sendStatus(200)
	      })
	      .catch(err => res.sendStatus(500))
      }
   })
   .catch(err => console.log(err))
});

module.exports = router;
