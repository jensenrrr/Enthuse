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
      //updateUserPostList(mongoose.Types.ObjectId(req.body._userid), post._id);
      res.json(post);
      var meme = mongoose.Types.ObjectId(req.body._userid);

      User.findById(meme).then(user => {
        user._postIDs.push(post._id);
        user.save(function(err) {
          if (err) console.log("Adding post._id to _postIDs failed.  " + err);
        });
      });
    })
    .catch(err => console.log(err));
});
//upvote a post if it isnt already upvoted by a user
//if it has already been upvoted then remove upvote
//JSON.parse(JSON.stringify(data.currentSets)),

router.post("/upvote", (req, res) => {
  var userID = mongoose.Types.ObjectId(req.body.userid);
  //console.log(userID);
  User.findOne(userID).then(user => {
    console.log(user);
    var postID = mongoose.Types.ObjectId(req.body.postid);
    // console.log(postID);
    if (
      user._likedPosts.some(function(arrVal) {
        //console.log("in user list " + arrVal);
        //console.log("postID" + postID);
        return req.body.postid === JSON.parse(JSON.stringify(arrVal));
      })
    ) {
      //console.log("dislike\\n\n\n\n");
      Post.findOne(postID).then(post => {
        // console.log(post);
        user._likedPosts.pull(post._id);
        // console.log(req.body.userid);
        post._likedUserIDs.pull(user._id);
        post.save().then(post => {
          user
            .save()
            .then(user =>
              res.json({
                liked: false,
                index: req.body.index,
                likes: post._likedUserIDs.length
              })
            );
        });
      });
    } else {
      Post.findOne(postID).then(post => {
        //console.log(post);
        user._likedPosts.push(post._id);
        //console.log(req.body.userid);
        post._likedUserIDs.push(user._id);
        post.save().then(post => {
          user
            .save()
            .then(user =>
              res.json({
                liked: true,
                index: req.body.index,
                likes: post._likedUserIDs.length
              })
            );
        });
      });
    }
  });
});

router.post("/commentOnPost", (req, res) => {});

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
            likes: post._likedUserIDs.length,
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
  processSets(req.body, returnPosts).then(posts => {
    res.json(posts);
  });

  async function processSets(sets, returnPosts) {
    const setMap = sets.map(set => {
      const catLabels = set.list.map(catLabel => {
        return findPosts(set, catLabel, returnPosts);
      });
      return Promise.all(catLabels).then(returnPosts => {
        return returnPosts;
      });
    });
    await Promise.all(setMap);
    return returnPosts;
  }

  async function findPosts(set, catLabel, returnPosts) {
    await Post.find({
      category: catLabel,
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
                var liked = false;
                if (
                  user._likedPosts.some(function(arrVal) {
                    return (
                      JSON.parse(JSON.stringify(post._id)) ===
                      JSON.parse(JSON.stringify(arrVal))
                    );
                  })
                ) {
                  liked = true;
                }
                const returnPost = {
                  content: post.content,
                  category: post.category,
                  location: post.location,
                  username: dets.username,
                  firstname: dets.name.first,
                  lastname: dets.name.last,
                  likes: post._likedUserIDs.length,
                  date: parseInt(post.date),
                  postID: post._id,
                  liked: liked
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
