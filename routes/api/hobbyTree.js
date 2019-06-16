const express = require("express");
const router = express.Router();
//const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
//const passport = require("passport");
const Category = require("../../models/Category");

router.get("/tree", (req, res) => {
  createTreeJson().then(ray => res.json(ray));
  function createTreeJson() {
    var count = 0;
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

          return recursiveCat(
            catArray.nodes,
            category.label,
            count - 1,
            list.slice(0)
          ).then(ray => ((catArray.nodes = ray), catArray));
        })
      );
    });
  }

  function recursiveCat(nodes, parLabel, indexC, list) {
    return Category.find({ parent: parLabel }).then(categories => {
      return Promise.all(
        categories.map(category => {
          var iList = list.slice(0);
          iList.push(category.label);
          var catArray = {
            key: category.label,
            label: category.label,
            index: indexC,
            list: iList,
            nodes: []
          };
          return recursiveCat(
            catArray.nodes,
            category.label,
            indexC,
            iList.slice(0)
          ).then(ray => ((catArray.nodes = ray), catArray));
        })
      );
    });
  }
});

module.exports = router;
