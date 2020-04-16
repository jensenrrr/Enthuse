const Category = require("../../models/Category");
const User = require("../../models/User");
const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
ObjectId = require("mongodb").ObjectID;
const mongoose = require("mongoose");
const Comment = require("../../models/Comment");

router.post("/changeCurrent", (req, res) => {
  User.findById(mongoose.Types.ObjectId(req.body.id)).then((user) => {
    user.currentSets = req.body.sets;
    user.save().then((user) => {
      res.json(user.currentSets);
    });
  });
});

router.post("/currentToHome", (req, res) => {
  User.findById(mongoose.Types.ObjectId(req.body.id)).then((user) => {
    user.currentSets = user.homePage;
    user.save().then((user) => {
      res.json(user.currentSets);
    });
  });
});
//untested
router.post("/loadMoreComments", (req, res) => {
  //need req.alreadyloadedcomments (ids) and req.parentID
  const returnComments = [];
  processComments(req, returnComments).then((meme) => {
    returnComments.sort((a, b) => (a.hRank > b.hRank ? -1 : 1));
    //console.log(returnComments);
    console.log("ressing");
    res.json(returnComments);
  });

  function processComments(req, returnComments) {
    return new Promise(function (resolve, reject) {
      Comment.find({ _parComment: req.body.parentID }).then((comments) => {
        comments.forEach(async (comment) => {
          //alreadyExists not currently working
          var alreadyExists = false;
          for (var i = 0; i < req.body.alreadyLoadedComments.length; i++) {
            alreadyExists = false;
            if (comment._id == req.body.alreadyLoadedComments[i]) {
              alreadyExists = true;
              break;
            }
          }
          if (!alreadyExists) {
            let promise = new Promise((resolve, reject) => {
              User.findById({ _id: comment._userID }).then(async (user) => {
                var liked = false;
                if (
                  user._likedComments.some(function (arrVal) {
                    return (
                      JSON.parse(JSON.stringify(comment._id)) ===
                      JSON.parse(JSON.stringify(arrVal))
                    );
                  })
                ) {
                  liked = true;
                }
                const nextComments = [];

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
                  liked: liked,
                  hRank: comment.hRank,
                };
                returnComments.push(returnComment);
                console.log(returnComment.content + "\n");
                resolve("done");
                //console.log(returnComments);
              });
            });

            let result = await promise;
            console.log(result);
            resolve("e");
          }
        });
      });
    });
  }
});

router.post("/setsAndPosts", (req, res) => {
  //console.log(req.body);
  User.findById(mongoose.Types.ObjectId(req.body.id)).then(async (user) => {
    var data = {
      currentSets: user.currentSets,
      favoriteSets: user.favoriteSets,
      homePage: user.homePage,
      returnPosts: [],
    };
    processSets(
      JSON.parse(JSON.stringify(data.currentSets)),
      data.returnPosts
    ).then((posts) => {
      data.returnPosts.sort((a, b) => (a.hRank > b.hRank ? -1 : 1));
      //console.log(data.returnPosts);
      res.json(data);
    });
  });

  async function processSets(sets, returnPosts) {
    const setMap = sets.map((set) => {
      const catLabels = set.list.map((catLabel) => {
        return findPosts(set, catLabel, returnPosts);
      });
      return Promise.all(catLabels).then((returnPosts) => {
        return returnPosts;
      });
    });
    await Promise.all(setMap);
    return returnPosts;
  }

  async function findPosts(set, catLabel, returnPosts) {
    await Post.find({
      category: catLabel,
      "location.county": set.location.county,
      "location.country": set.location.country,
      "location.state": set.location.state,
    }).then((posts) => {
      return Promise.all(
        posts.map(async (post) => {
          var dets = function (returnPosts, post) {
            return new Promise(function (resolve, reject) {
              User.findById({ _id: post._userID }).then(async (user) => {
                if (!user) {
                  console.log("error user not found findposts setsAndPosts");
                  resolve("user not foound");
                }

                var liked = false;
                if (
                  user._likedPosts.some(function (arrVal) {
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
                await getComments(post._id, returnComments);
                returnComments.sort((a, b) => (a.hRank > b.hRank ? -1 : 1));
                const returnPost = {
                  content: post.content,
                  hasImage: post.hasImage,
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
                  comments: returnComments,
                };
                //console.log(returnPost);
                var alreadyExists = false;
                for (var i = 0; i < returnPosts.length; i++) {
                  if (
                    JSON.stringify(returnPost.postID) ==
                    JSON.stringify(returnPosts[i].postID)
                  ) {
                    returnPosts[i].hRank = returnPosts[i].hRank * 1.3;
                    alreadyExists = true;
                  }
                }

                if (!alreadyExists) {
                  returnPosts.push(returnPost);
                }
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

  //db.collection.find({_parComment: null}).sort({hRank:-1}).limit(3) // for MAX
  async function getComments(parid, returnComments) {
    await Comment.find({ _parComment: null, _postID: parid })
      .sort({ hRank: -1 })
      .limit(3)
      .then(async (comments) => {
        //console.log(comments);
        //console.log(comments.size);

        var dets = function (returnComments, comment) {
          return new Promise(function (resolve, reject) {
            //console.log(comment);
            User.findById({ _id: comment._userID }).then(async (user) => {
              var liked = false;
              if (!user) {
                console.log("user not found");
                resolve();
              } else {
                if (
                  user._likedComments.some(function (arrVal) {
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
                  await getCommentsofComment(comment._id, nextComments, 1);
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
                  liked: liked,
                  hRank: comment.hRank,
                };
                //console.log(returnPost);
                //console.log("dets:   " + returnComment.content);

                returnComments.push(returnComment);
                //console.log(returnComments);
                resolve(returnComments);
              }
            });
          });
        };

        await Promise.all(
          comments.map(async (comment) => {
            return await dets(returnComments, comment);
          })
        );
      });
    return returnComments;
  }

  async function getCommentsofComment(parid, returnComments, level) {
    level++;
    await Comment.find({ _parComment: parid })
      .sort({ hRank: -1 })
      .limit(2)
      .then(async (comments) => {
        //console.log(comments);
        //console.log(comments.size);

        var dets = function (returnComments, comment) {
          return new Promise(function (resolve, reject) {
            //console.log(comment);
            User.findById({ _id: comment._userID }).then(async (user) => {
              if (!user) {
                console.log(
                  "error user not found findposts getCommentsofComment"
                );
                resolve("user not foound");
              }
              var liked = false;
              if (!user) {
                console.log("user not found, comment id - " + parid);

                resolve();
              } else {
                if (
                  user._likedComments.some(function (arrVal) {
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
                  if (level < 4)
                    await await getCommentsofComment(
                      comment._id,
                      nextComments,
                      level + 1
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
                  liked: liked,
                  hRank: comment.hRank,
                };
                //console.log(returnComment.content);

                returnComments.push(returnComment);
                //console.log(returnComments);
                resolve(returnComments);
              }
            });
          });
        };

        await Promise.all(
          comments.map(async (comment) => {
            return await dets(returnComments, comment);
          })
        );
      });
    return returnComments;
  }
  /*async function getComments(commentID, returnComments) {
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
  }*/
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
  User.findById(req.user.id).then((user) => {});
});

module.exports = router;
