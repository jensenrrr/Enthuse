const mongoose = require("mongoose");
const Category = require("../../models/Category");
const Post = require("../../models/Post");
const User = require("../../models/User");
const db = "mongodb://feels:badman1@ds121603.mlab.com:21603/usertests";
ObjectId = require("mongodb").ObjectID;
const moment = require("moment");
var HashMap = require("hashmap");

//const hash = require("hashmap");
//const isEmpty = require("is-empty");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

function createTreeJson() {
  var count = 0;
  console.log("Tree Creation Triggered:\n\n\n");
  return Category.find({ level: 0 }).then(categories => {
    return Promise.all(
      categories.map(category => {
        count++;
        list = [category.label];
        var catArray = {
          key: category.label,
          label: category.label,
          index: count - 1,
          list: list,
          nodes: []
        };

        return recursiveCat(catArray.nodes, category.label, count - 1, [
          list
        ]).then(ray => ((catArray.nodes = ray), catArray));
      })
    );
  });
}

function recursiveCat(nodes, parLabel, indexC, lists) {
  return Category.find({ parent: parLabel }).then(categories => {
    return Promise.all(
      categories.map(category => {
        var unconnectedList = [];
        lists.forEach(element => {
          unconnectedList.push(element);
        });
        unconnectedList.push([]);
        unconnectedList.forEach(element => {
          element.push(category.label);
        });
        var catArray = {
          key: category.label,
          label: category.label,
          index: indexC,
          list: unconnectedList[unconnectedList.length - 1],
          nodes: []
        };
        return recursiveCat(
          catArray.nodes,
          category.label,
          indexC,
          unconnectedList
        ).then(ray => ((catArray.nodes = ray), catArray));
      })
    );
  });
}

createTreeJson().then(ray => {
  ray.map(catObj => {
    catObj.nodes.map(childObj => {
      recrusivelyGetandSetLists(childObj);
      //console.log("would call  " + childObj.label);
    });
    console.log(catObj.label);
    Category.findOne({ label: catObj.label }).then(mongoObj => {
      console.log(mongoObj);

      mongoObj.list = catObj.list;
      mongoObj.save().then(cat => console.log(cat));
    });
  });
});

function recrusivelyGetandSetLists(catObj) {
  Category.findOne({ label: catObj.label }).then(mongoObj => {
    console.log(catObj);

    if (catObj.nodes.length > 0) {
      catObj.nodes.map(childObj => {
        recrusivelyGetandSetLists(childObj);
      });
    }
    mongoObj.list = catObj.list;
    mongoObj.save().then(cat => console.log(cat));
  });
}
