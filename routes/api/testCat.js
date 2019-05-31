const mongoose = require("mongoose");
const Category = require("../../models/Category");
const db = "mongodb://feels:badman1@ds121603.mlab.com:21603/usertests";
const hash = require("hashmap");

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


//leveled data populator
  var dataOne = [];
  var map = new hash();

  Category.find({ level: 0 }).then( categories => {
      categories.forEach((category) => {
        if(dataOne.length==1 && dataOne[0]==""){
          dataOne[0]=category.label;  
        }
        else{
        dataOne.push(category.label);
        }
        //console.log(category.label)
        //console.log(dataOne.length-1)
        map.set(category.label, dataOne.length-1)
      })
  })

  var dataTwo = [[]];
  
  Category.find({ level: 1 }).then( categories => {
      categories.forEach((category) => {
        var x = map.get(category.parent);
        console.log(x)
        if(!dataTwo[x]){    
            dataTwo[x]=[category.label];
        }else{
          dataTwo[x].push(category.label);
        }
        map.set(category.label, dataTwo[x].length-1);
        //console.log(dataTwo)
        for(var i = 0; i<dataTwo.length; i++){
          console.log(i)
          console.log(dataTwo[i]+'\n')
        }
      })
  });


  var dataThree = [[[]]];
  Category.find({ level: 2 }).then( categories => {
    categories.forEach((category) => {
      var x = map.get(category.parent);
      console.log(x)
      if(!dataTwo[x]){
          dataTwo[x]=[category.label];
      }else{
        dataTwo[x].push(category.label);
      }
      //console.log(dataTwo)
      for(var i = 0; i<dataTwo.length; i++){
        console.log(i)
        console.log(dataTwo[i]+'\n')
      }
    })
});

/*
function printTwo(a){
  for(var i = 0; i < a.length; i++) {
    console.log("next section \n\n\n\n\n")
    for(var z = 0; z < a[i].length; z++) {
      console.log(a[i][z]);
    }

}
}
*/







  /*
var data = [];
Category.find({ level: 1 }).then( categories => {
    categories.forEach((category) => {
      data.push(category.label)
      console.log(data)
    })
})
*/


/*
const newCat = new Category;

newCat.label = "Sports";
newCat.children.push("Basketball");
newCat.children.push("Football");
newCat.children.push("Combat Sports");
newCat.children.push("Golf");
newCat.children.push("Tennis");
newCat.children.push("Soccer");
newCat.children.push("Hockey");
newCat.children.push("Track");
newCat.children.push("Volleyball");
newCat.children.push("Rugby");



newCat.parent = ""
newCat.level = 0;
newCat.save();
*/
/*

Failed array creation:

var data = [];
var count = 0;

Category.find({ level: 0 }).then( category => {
  if(category){
    console.log(category)
   try{
      data[count] = category.label;
    }
    catch{
      console.log("push error")
    }
    var children = category[0].children;
    console.log(children)
    if(children){
        recursiveCat(children, data[count]).then()
        count++;
    }
    else(console.log("no children"))
    console.log("data: " + data)
  }
})



function recursiveCat(children, data){ 
  
    for(var i =0; i< children.length; i++){
      recChildTool(children, data, i);
    }
}

function recChildTool(children, data, i){
  Category.find({ label: children[i] }).then( category => {
    if(category){
      try{
          data[i] = category.label;
      }
      catch(error){
        console.log("failed something")
      }
    try{
        recursiveCat(category[0].children, data[data.length-1])
    }
    catch(error){
      console.log("Has non-created child category.")
    }
    }
    else{
        console.log("none found")
    }
})
}
*/