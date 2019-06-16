const Category = require("../../models/Category");
const User = require("../../models/User");
const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
ObjectId = require("mongodb").ObjectID;
const mongoose = require("mongoose");

router.post("/changeCurrent", (req, res) => {
  User.findById(mongoose.Types.ObjectId(req.body.id)).then(user => {
    user.currentSets = req.body.sets;
    user.save().then(user => {
      res.json(user.currentSets);
    });
  });
});
/*
function update(sets) {
  User.findById(id).then(user => {
    //console.log(user);
    //console.log("\n\n" + user.currentSets);
    sets.forEach(function(set) {
      user.currentSets.push(set);
    });

    user.save().then(user => {
      console.log(user);
    });
  });
}
-------------------------------------------------------------------------------------------

function update(set) {
  User.findById(id).then(user => {
    //console.log(user);
    //console.log("\n\n" + user.currentSets);
    user.currentSets.push(set);

    user.save().then(user => {
      console.log(user);
    });
  });
*/
router.post("/changeHome", (req, res) => {
  User.findById(req.user.id).then(user => {});
});

module.exports = router;
