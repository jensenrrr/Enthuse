const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const categorySchema = new Schema({
  label: {
    type: String,
    required: true
  },
  list: {
    type: [String],
    default: [this.label]
  },
  parent: {
    type: String,
    deafault: ""
  },
  children: [String],
  postCount: {
    type: Number,
    default: 0
  },
  level: Number
});

module.exports = category = mongoose.model("categories", categorySchema);
