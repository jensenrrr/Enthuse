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
  date: {
    type: String,
    default: moment()
  }
});
