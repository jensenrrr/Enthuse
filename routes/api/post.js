const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
ObjectId = require("mongodb").ObjectID;
const mongoose = require("mongoose");

const Post = require("../../models/Post");

router.post("/create", (req, res) => {
  const newPost = new Post({
    _userID: mongoose.Types.ObjectId(req.body._userid),
    category: req.body.category,
    location: req.body.location,
    content: req.body.content
  });
  newPost
    .save()
    .then(post => res.json(post))
    .catch(err => console.log(err));
});

module.exports = router;
