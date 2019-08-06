const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const CommentSchema = new Schema({
  _userID: {
    type: Schema.Types.ObjectId,
    required: true
  },
  _postID: {
    type: Schema.Types.ObjectId,
    required: true
  },
  _parComment: {
    type: Schema.Types.ObjectId
  },
  _likedUserIDs: {
    type: [Schema.Types.ObjectId]
  },
  _commentIDs: {
    type: [Schema.Types.ObjectId]
  },
  content: {
    type: String,
    required: true
  },
  hRank: {
    type: Number,
    default: 5
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
module.exports = Comment = mongoose.model("comments", CommentSchema);
