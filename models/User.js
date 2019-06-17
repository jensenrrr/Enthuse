const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

// Create Schema
const UserSchema = new Schema({
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true }
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  _postIDs: {
    type: [Schema.Types.ObjectId]
  },
  favoriteSets: [
    {
      category: String,
      list: [String],
      location: {
        country: String,
        state: String,
        county: String
      }
    }
  ],
  currentSets: [
    {
      category: String,
      list: [String],
      location: {
        country: String,
        state: String,
        county: String
      }
    }
  ],
  homePage: [
    {
      category: String,
      list: [String],
      location: {
        country: String,
        state: String,
        county: String
      }
    }
  ],
  date: {
    type: String,
    default: moment()
  }
});

module.exports = User = mongoose.model("users", UserSchema);

/*
name: {
  first: {type: String, required: true},
  last: {type: String, required: true}
},


*/
