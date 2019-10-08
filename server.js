const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const tree = require("./routes/api/hobbyTree");
const post = require("./routes/api/post");
const set = require("./routes/api/set");
const moment = require("moment");
const Post = require("./models/Post");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// update rating interval
the_interval = 6 * 60 * 1000;
setInterval(function() {
  console.log("meme at 5");

  Comment.find().then(comments => {
    comments
      .map(comment => {
        if (comment.hRank > 0.001) {
          var timeDiff = (moment() - comment.date) / 3600000;
          var x = 0.8 + 0.2 * (1 / (1 + Math.log((timeDiff ^ 2) + 2)));
          comment.hRank = Number(comment.hRank * x);
          comment.save();
        }
        comment.save();
      })
      .catch(comment => {
        console.log(comment.content + " update failed.");
      });
  });
  Post.find({}).then(posts => {
    posts.map(post => {
      //console.log(moment(post.date));
      if (post.hRank > 0.001) {
        //time difference between create date and now in minutes
        var timeDiff = (moment() - post.date) / 3600000;
        var x = 0.8 + 0.2 * (1 / (1 + Math.log((timeDiff ^ 2) + 2)));
        post.hRank = post.hRank * x;
        post.save();
      }
    });
  });
}, the_interval);

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/tree", tree);
app.use("/api/post", post);
app.use("/api/set", set);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
