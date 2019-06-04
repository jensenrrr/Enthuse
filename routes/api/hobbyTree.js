const express = require("express");
const router = express.Router();
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
//const passport = require("passport");
const Category = require("../../models/Category");

router.get("/tree", (req, res) => {
  
  console.log("called")
  
  createTreeJson().then((ray) => res.json(ray));
  function createTreeJson(){
    var count = 0;
      return Category.find({ level: 0 }).then( categories => {
          return Promise.all(
              categories.map(category => {
                count++; 
                  var catArray = {
                      key: category.label,
                      label: category.label,
                      index: count-1,
                      nodes: []
                  };
                    
                  return recursiveCat(catArray.nodes, category.label, count-1).then(
                      ray => (catArray.nodes = ray, catArray)
                  );
              }
          ));
      });
  };
  
  function recursiveCat(nodes, parLabel, indexC){
      return Category.find({ parent: parLabel }).then( categories => {
          return Promise.all(categories.map((category) => {
              var catArray = {
                  key: category.label,
                  label: category.label,
                  index: indexC,
                  nodes:  []
              };
              return recursiveCat(catArray.nodes, category.label, indexC).then(
                  ray => (catArray.nodes = ray, catArray)
              );
          }));
      })
  }

})

module.exports = router;
