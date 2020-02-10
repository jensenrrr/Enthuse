const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
ObjectId = require("mongodb").ObjectID;
const mongoose = require("mongoose");

const Post = require("../../models/Post");
const User = require("../../models/User");
const Comment = require("../../models/Comment");

router.post("/likeComment", (req, res) => {
  console.log("likecomment");
  console.log(req.body);
  var userID = mongoose.Types.ObjectId(req.body.userid);
  //console.log(userID);
  User.findOne(userID).then(user => {
    //console.log(user);
    var commentID = mongoose.Types.ObjectId(req.body.commentid);
    // console.log(commentID);
    if (
      user._likedComments.some(function(arrVal) {
        //console.log("in user list " + arrVal);
        //console.log("commentID" + commentID);
        return req.body.commentid === JSON.parse(JSON.stringify(arrVal));
      })
    ) {
      //console.log("dislike\\n\n\n\n");
      Comment.findOne(commentID).then(comment => {
        // console.log(comment);
        user._likedComments.pull(comment._id);
        if (comment.hRank > 1) {
          comment.hRank -= Number(
            1 /
              (Math.pow(comment._likedUserIDs.length - 1, 1.2) * 0.1 +
                Math.pow(comment.commentCount.length, 1.2) * 0.05 +
                1)
          );
        }
        // console.log(req.body.userid);
        comment._likedUserIDs.pull(user._id);
        comment.save().then(comment => {
          user.save().then(user =>
            res.json({
              liked: false,
              indices: req.body.indices,
              likes: comment._likedUserIDs.length
            })
          );
        });
      });
    } else {
      Comment.findOne(commentID).then(comment => {
        //console.log(post);
        user._likedComments.push(comment._id);
        //console.log(req.body.userid);
        comment._likedUserIDs.push(user._id);
        console.log("inc /n/n");
        comment.hRank += Number(
          1 /
            (Math.pow(Number(comment._likedUserIDs.length) - 1, 1.2) * 0.1 +
              Math.pow(Number(comment.commentCount.length), 1.2) * 0.05 +
              1)
        );
        /*
        comment.hRank += Number(
          1 /
            (Math.pow(Number(comment._likedUserIDs.length) - 1, 1.2) * 0.1 +
              Math.pow(Number(comment.commentCount.length), 1.2) * 0.05 +
              1)
        );
        */
        comment.save().then(comment => {
          user.save().then(user =>
            res.json({
              liked: true,
              indices: req.body.indices,
              likes: comment._likedUserIDs.length
            })
          );
        });
      });
    }
  });
});

router.post("/comment", (req, res) => {
  const newComment = new Comment({
    _userID: mongoose.Types.ObjectId(req.body._userid),
    content: req.body.content,
    _postID: mongoose.Types.ObjectId(req.body._postid)
  });

  newComment.save().then(comment => {
    var userid = mongoose.Types.ObjectId(req.body._userid);
    var postid = mongoose.Types.ObjectId(req.body._postid);

    User.findById(userid).then(user => {
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
      const returnComment = {
        content: comment.content,
        username: user.username,
        firstname: user.name.first,
        lastname: user.name.last,
        likes: comment._likedUserIDs.length,
        commentCount: comment._commentIDs.length,
        date: parseInt(comment.date),
        commentID: comment._id,
        comments: [],
        liked: liked
      };
      console.log(req.body);
      res.json({ comment: returnComment, index: req.body.index });

      user._commentIDs.push(comment._id);
      user.save(function(err) {
        if (err)
          console.log("Adding comment._id to _commentIDs failed.  " + err);
      });
    });
    Post.findById(postid).then(post => {
      post._commentIDs.push(comment._id);
      var x = post.commentCount;
      post.hRank += 1 / (0.1 * Math.pow(post.commentCount, 1.2) + 1);
      post.commentCount = x + 1;
      post.save(function(err) {
        if (err) console.log("Adding comment._id to post failed. " + err);
      });
    });
  });
});

router.post("/commentOnComment", (req, res) => {
  //console.log(req.body);
  const cid = req.body._commentid;
  const uid = req.body._userid;
  //console.log("comment:  " + cid + "  user: " + uid);
  //console.log(req.body._user])
  const newComment = new Comment({
    _userID: mongoose.Types.ObjectId(req.body._userid),
    _parComment: cid,
    content: req.body.content,
    _postID: mongoose.Types.ObjectId(req.body._postid)
  });
  // console.log("comment:  " + cid + "  user: " + uid);
  newComment.save().then(comment => {
    User.findById(uid).then(user => {
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
      const returnComment = {
        content: comment.content,
        username: user.username,
        firstname: user.name.first,
        lastname: user.name.last,
        likes: comment._likedUserIDs.length,
        commentCount: comment._commentIDs.length,
        date: parseInt(comment.date),
        commentID: comment._id,
        comments: [],
        liked: liked
      };
      res.json({ comment: returnComment, indices: req.body.indices });
      user._commentIDs.push(comment._id);
      user.save(function(err) {
        if (err)
          console.log("Adding comment._id to _commentIDs failed.  " + err);
      });
    });

    const newcid = comment._id;
    Comment.findById(cid).then(comment => {
      comment._commentIDs.push(newcid);
      comment.commentCount += 1;
      incrementCommentCountonComments(comment._parComment);
      comment.save(function(err) {
        if (err) console.log("Adding comment._id to post failed. " + err);
      });

      function incrementCommentCountonComments(parid) {
        Comment.findById(parid).then(comment => {
          comment.commentCount += 1;
          comment.hRank += Number(
            1 / (0.1 * Math.pow(Number(comment.commentCount), 1.2) + 1)
          );
          if (comment._parComment) {
            incrementCommentCountonComments(comment._parComment);
          }
          comment.save(function(err) {
            if (err) console.log("Adding comment._id to post failed. " + err);
          });
        });
      }
    });

    Post.findById(mongoose.Types.ObjectId(req.body._postid)).then(post => {
      console.log(post);
      post.hRank += 1 / (0.1 * Math.pow(post.commentCount, 1.2) + 1);
      post.commentCount += 1;
      //console.log(post.content + " incremented one");
      post.save(function(err) {
        if (err) console.log("Adding commentcouint to post failed. " + err);
      });
    });
  });
});

router.post("/getComments", (req, res) => {
  const returnComments = [];
  const id = req.body;
  startGet(id, returnComments).then(comments => res.json(comments));

  async function startGet(id, returnComments) {
    Post.findById(id).then(async post => {
      const promises = post._commentIDs.map(commentID => {
        return getComments(commentID, returnComments);
      });
      await Promise.all(promises);
      return returnComments;
    });
  }

  function getComments(commentID, returnComments) {
    Comment.findById(commentID).then(comment => {
      var dets = function(returnComments, comment) {
        return new Promise(function(resolve, reject) {
          User.findById({ _id: comment._userid }).then(user => {
            var liked = false;
            if (
              user._likedComments.some(function(arrVal) {
                //console.log("in user list " + arrVal);
                //console.log("postID" + post._id);
                return (
                  JSON.parse(JSON.stringify(comment._id)) ===
                  JSON.parse(JSON.stringify(arrVal))
                );
              })
            ) {
              liked = true;
            }
            const returnComment = {
              content: comment.content,
              category: comment.category,
              location: comment.location,
              username: dets.username,
              firstname: dets.name.first,
              lastname: dets.name.last,
              likes: comment._likedUserIDs.length,
              commentCount: comment._commentIDs.length,
              date: parseInt(comment.date),
              commentID: comment._id,
              liked: liked
            };
            //console.log(returnPost);
            returnComments.push(returnComment);
            resolve(returnComments);
          });
        });
      };
    });
  }
});

router.post("/create", (req, res) => {
  const newPost = new Post({
    _userID: mongoose.Types.ObjectId(req.body._userid),
    category: req.body.category,
    location: req.body.location,
    content: req.body.content
  });
  User.findById(mongoose.Types.ObjectId(req.body._userid)).then(user => {
    if (!user) {
      res.status(400).json("user does not exist");
    } else {
      newPost
        .save()
        .then(post => {
          //updateUserPostList(mongoose.Types.ObjectId(req.body._userid), post._id);
          res.json(post);

          user._postIDs.push(post._id);
          user.save(function(err) {
            if (err) console.log("Adding post._id to _postIDs failed.  " + err);
          });
        })
        .catch(err => console.log(err));
    }
  });
  //updateUserPostList(mongoose.Types.ObjectId(req.body._userid));
});
//upvote a post if it isnt already upvoted by a user
//if it has already been upvoted then remove upvote
//JSON.parse(JSON.stringify(data.currentSets)),

router.post("/upvote", (req, res) => {
  var userID = mongoose.Types.ObjectId(req.body.userid);
  //console.log(userID);
  User.findOne(userID).then(user => {
    //console.log(user);
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
        post.hRank -=
          1 /
          (Math.pow(post._likedUserIDs.length - 1, 1.2) * 0.1 +
            Math.pow(post.commentCount.length, 1.2) * 0.05 +
            1);

        post.save().then(post => {
          user.save().then(user =>
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
        post.hRank +=
          1 /
          (Math.pow(post._likedUserIDs.length, 1.2) * 0.1 +
            Math.pow(post.commentCount.length, 1.2) * 0.05 +
            1);
        post.save().then(post => {
          user.save().then(user =>
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

router.post("/getuserposts", (req, res) => {
  const returnPosts = [];
  findUser(req.body.username, returnPosts).then(posts => res.json(posts));

  async function findUser(username, returnPosts) {
    await User.findOne({ username: username }).then(async user => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
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
            commentCount: post._commentIDs.length,
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
    returnPosts.sort((a, b) => (a.hRank > b.hRank ? -1 : 1));
    console.log(returnPosts);
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
              User.findById({ _id: post._userID }).then(async user => {
                if (!user) {
                  console.log("error user not found findposts setsAndPosts");

                  resolve("user not foound");
                } else {
                  //console.log(user);
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
                    comments: returnComments
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
                }
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
      // console.log(comment);
      var dets = function(returnComments, comment) {
        return new Promise(function(resolve, reject) {
          // console.log(comment);
          User.findById({ _id: comment._userID }).then(async user => {
            var liked = false;
            if (!user) {
              console.log("error user not found get comments");
              resolve("error user not foudn");
            }
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
module.exports = router;
