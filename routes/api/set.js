const Category = require("../../models/Category");
const User = require("../../models/User");
const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
ObjectId = require("mongodb").ObjectID;
const mongoose = require("mongoose");
const Comment = require("../../models/Comment");

router.post("/changeCurrent", (req, res) => {
  User.findById(mongoose.Types.ObjectId(req.body.id)).then(user => {
    user.currentSets = req.body.sets;
    user.save().then(user => {
      res.json(user.currentSets);
    });
  });
});

router.post("/currentToHome", (req, res) => {
  User.findById(mongoose.Types.ObjectId(req.body.id)).then(user => {
    user.currentSets = user.homePage;
    user.save().then(user => {
      res.json(user.currentSets);
    });
  });
});

router.post("/setsAndPosts", (req, res) => {
  //console.log(req.body);
  User.findById(mongoose.Types.ObjectId(req.body.id)).then(async user => {
    var data = {
      currentSets: user.currentSets,
      favoriteSets: user.favoriteSets,
      homePage: user.homePage,
      returnPosts: []
    };
    processSets(
      JSON.parse(JSON.stringify(data.currentSets)),
      data.returnPosts
    ).then(posts => {
      data.returnPosts.sort((a, b) => (a.hRank > b.hRank ? -1 : 1));
      console.log(data.returnPosts);
      res.json(data);
    });
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
              User.findById({ _id: post._userID }).then(async user => {
                var liked = false;
                if (
                  user._likedPosts.some(function(arrVal) {
                    //console.log("in user list " + arrVal);
                    //console.log("postID" + post._id);
                    return (
                      JSON.parse(JSON.stringify(post._id)) ===
                      JSON.parse(JSON.stringify(arrVal))
                    );
                  })
                ) {
                  liked = true;
                }
                const returnComments = [];
                await Promise.all(
                  post._commentIDs.map(async commentID => {
                    const retC = await getComments(commentID, returnComments);
                    return retC;
                  })
                );

                const returnPost = {
                  content: post.content,
                  category: post.category,
                  location: post.location,
                  username: user.username,
                  firstname: user.name.first,
                  lastname: user.name.last,
                  likes: post._likedUserIDs.length,
                  commentCount: post.commentCount,
                  date: parseInt(post.date),
                  postID: post._id,
                  liked: liked,
                  hRank: post.hRank,
                  comments: returnComments
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

  async function getComments(commentID, returnComments) {
    await Comment.findById(commentID).then(comment => {
      //console.log(comment);
      var dets = function(returnComments, comment) {
        return new Promise(function(resolve, reject) {
          //console.log(comment);
          User.findById({ _id: comment._userID }).then(async user => {
            var liked = false;
            if (
              user._likedComments.some(function(arrVal) {
                return (
                  JSON.parse(JSON.stringify(comment._id)) ===
                  JSON.parse(JSON.stringify(arrVal))
                );
              })
            ) {
              liked = true;
            }
            const nextComments = [];
            if (comment._commentIDs.length > 0) {
              await Promise.all(
                comment._commentIDs.map(async commentID => {
                  const retC = await getComments(commentID, nextComments);
                  return retC;
                })
              );
            }
            const returnComment = {
              content: comment.content,
              username: user.username,
              firstname: user.name.first,
              lastname: user.name.last,
              likes: comment._likedUserIDs.length,
              commentCount: comment._commentIDs.length,
              date: parseInt(comment.date),
              commentID: comment._id,
              comments: nextComments,
              liked: liked
            };
            //console.log(returnPost);
            returnComments.push(returnComment);
            //console.log(returnComments);
            resolve(returnComments);
          });
        });
      };
      return dets(returnComments, comment);
    });
    return returnComments;
  }
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
