const mongoose = require("mongoose");

const Category = require("../../models/Category");

const db = "mongodb://feels:badman1@ds121603.mlab.com:21603/usertests";

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));



//takes in label and creates nonexisting children
var labelPar = "Combat Sports";
Category.findOne({ label: labelPar }).then( function(category) {
    if(!category)
       throw new Error('Parent not found.');
  console.log(category.children)
  var levelPar = category.level;
  var childArr = category.children;
  console.log("Begin child creation.")

  for(var i =0; i< childArr.length; i++){
    createChild(childArr[i], labelPar, levelPar);
  }

})

function createChild(name, labelPar, levelPar){
    Category.findOne({ label: name }).then( function(category) {
      if(!category)
      {
        const newC = new Category;
        newC.label = name;
        newC.parent = labelPar;
        newC.level = levelPar+1;
        newC.save()
     }
     else if(category != "undefined" && category.label != null){
       console.log(category.label)
     }
    })
}


