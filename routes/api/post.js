const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
ObjectId = require("mongodb").ObjectID;
const mongoose = require("mongoose");

const Post = require("../../models/Post");
const User = require("../../models/User");

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

router.post("/getposts", (req, res) => {
  const returnPosts = [];
  processSets(req.body, returnPosts).then(posts => res.json(posts));

  async function processSets(sets, returnPosts) {
    const promises = sets.map(set => findPosts(set, returnPosts));
    await Promise.all(promises);
    return returnPosts;
  }

  async function findPosts(set, returnPosts) {
    await Post.find({
      category: set.category,
      location: set.location
    }).then(posts => {
      return Promise.all(
        posts.map(async post => {
          var dets = function(returnPosts, post) {
            return new Promise(function(resolve, reject) {
              User.findById({ _id: post._userID }).then(user => {
                const dets = {
                  username: user.username,
                  name: {
                    first: user.name.first,
                    last: user.name.last
                  }
                };
                const returnPost = {
                  content: post.content,
                  category: post.category,
                  location: post.location,
                  username: dets.username,
                  firstname: dets.name.first,
                  lastname: dets.name.last,
                  date: post.date,
                  postID: post._id
                };
                console.log(returnPost);
                returnPosts.push(returnPost);
                resolve(returnPosts);
              });
            });
          };

          return dets(returnPosts, post);
        })
      );
    });
    return returnPosts;
  }
});
module.exports = router;
