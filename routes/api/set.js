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

router.post("/currentToHome", (req, res) => {
  User.findById(mongoose.Types.ObjectId(req.body.id)).then(user => {
    user.currentSets = user.homePage;
    user.save().then(user => {
      res.json(user.currentSets);
    });
  });
});

router.post("/setsAndPosts", (req, res) => {
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
    ).then(posts => res.json(data));
  });

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
