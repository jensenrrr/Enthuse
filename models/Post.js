const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

// Create Schema
const PostSchema = new Schema({
  _userID: {
    type: Schema.Types.ObjectId,
    required: true
  },
  _commentIDs: {
    type: [Schema.Types.ObjectId]
  },
  _likedUserIDs: {
    type: [Schema.Types.ObjectId]
  },
  _dislikedUserIDs: {
    type: [Schema.Types.ObjectId]
  },
  category: {
    type: String,
    required: true
  },
  location: {
    country: { type: String, required: true },
    state: { type: String, required: true },
    county: { type: String, required: true }
  },
  content: {
    type: String,
    required: true
  },
  commentCount: {
    type: Number,
    default: 0
  },
  date: {
    type: String,
    default: moment()
  }
});

module.exports = Post = mongoose.model("posts", PostSchema);
