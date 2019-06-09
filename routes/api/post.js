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
      posts.forEach(post => {
        const returnPost = {
          content: post.content,
          category: post.category,
          location: post.location
        };
        returnPosts.push(returnPost);
      });
    });
    return returnPosts;
  }
  //processPosts(returnPosts, req.body).then(posts => res.json(posts));
  /*
  async function pusher(post, array) {
    array.push(post);

    return 1;
  }
  async function processPosts(returnPosts, array) {
    const promises = array.map(pusher);
    await Promise.all(promises);
    req.body.forEach(async post => {});

    for (var i = 0; i < req.body.length(); i++) {
      Post.find({
        category: req.body[i].category,
        location: req.body[i].location
      }).then(posts => {
        posts.forEach(post => {
          const returnPost = {
            content: post.content,
            category: post.category,
            location: post.location
          };
          returnPosts.push(returnPost);
        });
      });
    }
  }
  */
});

module.exports = router;
