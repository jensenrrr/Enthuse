const Category = require("../../models/Category");
const User = require("../../models/User");
const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
ObjectId = require("mongodb").ObjectID;
const mongoose = require("mongoose");

router.post("/changeCurrent", (req, res) => {
  User.findById(mongoose.Types.ObjectId(req.body.id)).then(user => {
    user.currentSets.push(
      req.body.sets[req.body.sets[req.body.sets.length - 1]]
    );
    console.log(user.currentSets);
    console.log("\nsets: " + req.body.sets);
    user.save().then(user => {
      console.log(user);
      res.json(req.body.sets);
    });
  });
});

router.post("/changeHome", (req, res) => {
  User.findById(req.user.id).then(user => {});
});

module.exports = router;
