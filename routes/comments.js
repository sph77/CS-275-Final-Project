const express = require('express');
const router = express.Router();
const db = require('../config/database');
const comment = require('../models/Comment');
const sequelize = require('sequelize');

router.get("/", (req, res) => {
   comment.findAll()
      .then(comments => res.status(200).send(comments))
      .catch(err => console.log(err))
});

router.get("/:crn", (req, res) => {
   comment.findAll({
      where: {
         crn: req.params.crn
      }
   })
   .then(comments => {
      if (comments.length != 1)
      {
         res.sendStatus(404);
      }
      else
      {
         res.status(200).send(comments[0]);
      }
   })
   .catch(err => console.log(err))
});

router.post("/:crn", (req, res) => {
   comment.findAll({
      where: {
         crn: req.params.crn
      }
   })
   .then(comments => {
      if (comments.length != 1)
      {
         res.sendStatus(404);
      }
      else
      {
         var curComments = JSON.parse(comments[0].data);
	 var newRating = parseInt(req.body.rating); 
	 var newText = req.body.text;
	 var newComment = { "rating": newRating, "comment": newText }
	 curComments.push(newComment);
	 var dataString = JSON.stringify(curComments);
	 comment.update( { data : dataString }, { where: { crn: req.params.crn } })
	      .then(result => { res.sendStatus(200)
	      })
	      .catch(err => res.sendStatus(500))
      }
   })
   .catch(err => console.log(err))
});

module.exports = router;
