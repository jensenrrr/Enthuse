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
  //updateUserPostList(mongoose.Types.ObjectId(req.body._userid));
  newPost
    .save()
    .then(post => {
      updateUserPostList(mongoose.Types.ObjectId(req.body._userid), post._id);
      res.json(post);
    })
    .catch(err => console.log(err));

  function updateUserPostList(userid, postid) {
    User.findByIdAndUpdate(
      { _id: userid },
      { $push: { _postIDs: { postid } } }
    ).catch(err => console.log(err));
  }
});

router.post("/getuserposts", (req, res) => {
  const returnPosts = [];
  findUser(req.body.username, returnPosts).then(posts => res.json(posts));

  async function findUser(username, returnPosts) {
    await User.findOne({ username: username }).then(async user => {
      await Post.find({
        _userID: user._id
      }).then(async posts => {
        posts.map(post => {
          returnPosts.push({
            content: post.content,
            category: post.category,
            location: post.location,
            username: user.username,
            firstname: user.name.first,
            lastname: user.name.last,
            date: parseInt(post.date),
            postID: post._id
          });
        });
      });
    });
    return returnPosts;
  }
});

router.post("/getposts", (req, res) => {
  const returnPosts = [];
  processSets(req.body, returnPosts).then(posts => res.json(posts));

  async function processSets(sets, returnPosts) {
    console.log(typeof sets + "\n\n" + sets.location + "\n\n");
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
                /*
                console.log(
                  moment(parseInt(post.date))
                    .tz(set.timzone)
                    .format()
                );*/

                const returnPost = {
                  content: post.content,
                  category: post.category,
                  location: post.location,
                  username: dets.username,
                  firstname: dets.name.first,
                  lastname: dets.name.last,
                  date: parseInt(post.date),
                  postID: post._id
                };
                //console.log(returnPost);
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
