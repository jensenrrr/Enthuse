const assert = require("assert");
const mongoose = require("mongoose");
const dbKey = require("./config/keys").mongoURI;

let _db;

function init_db(callback) {
  if (_db) {
    console.warn("Init existing DB attempt");
    return callback(null, _db);
  }
  mongoose.connect(dbKey, { useNewUrlParser: true }, connected);

  function connected(err, db) {
    if (err) {
      return callback(err);
    }
    console.log("MongoDB connected");
    _db = db;
    callback(null, _db);
  }
}

function get_db() {
  assert.ok(_db, "Db not initialized yet. Called init_db first.");
  return _db;
}

function check_db() {
  if (_db) return true;
  return false;
}

const close_db = () => _db.close();

module.exports = {
  get_db,
  init_db,
  close_db,
  check_db
};

//credit: https://itnext.io/how-to-share-a-single-database-connection-in-a-node-js-express-js-app-fcad4cbcb1e
