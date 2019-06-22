const mongoose = require("mongoose");
const Category = require("../../models/Category");
const Post = require("../../models/Post");
const User = require("../../models/User");
const db = "mongodb://feels:badman1@ds121603.mlab.com:21603/usertests";
ObjectId = require("mongodb").ObjectID;
const moment = require("moment");
var HashMap = require("hashmap");
const Comment = require("../../models/Comment");

//const hash = require("hashmap");
//const isEmpty = require("is-empty");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

const returnComments = [];
const id = "5cfd20daedfb1e2c107ba974";
startGet(id, returnComments).then(comments => {
  console.log(comments);
});

async function startGet(id, returnComments) {
  await Post.findById(id).then(async post => {
    await Promise.all(
      post._commentIDs.map(async commentID => {
        const retC = await getComments(commentID, returnComments);
        return retC;
      })
    );
  });
  return returnComments;
}

async function getComments(commentID, returnComments) {
  await Comment.findById(commentID).then(comment => {
    var dets = function(returnComments, comment) {
      return new Promise(function(resolve, reject) {
        User.findById({ _id: comment._userID }).then(user => {
          var liked = false;
          if (
            user._likedComments.some(function(arrVal) {
              return (
                JSON.parse(JSON.stringify(comment._id)) ===
                JSON.parse(JSON.stringify(arrVal))
              );
            })
          ) {
            liked = true;
          }
          const returnComment = {
            content: comment.content,
            username: user.username,
            firstname: user.name.first,
            lastname: user.name.last,
            likes: comment._likedUserIDs.length,
            commentCount: comment._commentIDs.length,
            date: parseInt(comment.date),
            commentID: comment._id,
            liked: liked
          };
          //console.log(returnPost);
          returnComments.push(returnComment);
          //console.log(returnComments);
          resolve(returnComments);
        });
      });
    };
    return dets(returnComments, comment);
  });
  return returnComments;
}

/*
Category.findOne({ label: "Video Games" }).then(mongoObj => {
  console.log(mongoObj);
  mongoObj.list = ["Video Games"];
  console.log(mongoObj);
  mongoObj.save().then(cat => console.log("saved\n" + cat));
});
*/
/*
var id = "5cfb44bff02caf1bdc5a030c";
var set = {
  category: "Wrestling",
  location: {
    country: "US",
    state: "Florida",
    county: "Alachua"
  }
};
var sets = [
  {
    category: "League of Legends",
    location: {
      country: "US",
      state: "Florida",
      county: "Alachua"
    }
  },
  {
    category: "Basketball",
    location: {
      country: "US",
      state: "Florida",
      county: "Alachua"
    }
  }
];
change(sets);
function change(sets) {
  User.findById(id).then(user => {
    user.currentSets = sets;
    user.save().then(user => {
      console.log(user);
    });
  });
}

function update(set) {
  User.findById(id).then(user => {
    //console.log(user);
    //console.log("\n\n" + user.currentSets);
    user.currentSets.push(set);

    user.save().then(user => {
      console.log(user);
    });
  });
}
*/
/*
function update(sets) {
  User.findById(id).then(user => {
    //console.log(user);
    //console.log("\n\n" + user.currentSets);
    sets.forEach(function(set) {
      user.currentSets.push(set);
    });

    user.save().then(user => {
      console.log(user);
    });
  });
}
-------------------------------------------------------------------------------------------

function update(set) {
  User.findById(id).then(user => {
    //console.log(user);
    //console.log("\n\n" + user.currentSets);
    user.currentSets.push(set);

    user.save().then(user => {
      console.log(user);
    });
  });
*/

//console.log(moment(1560436342725).format("hh:mm A MMM D, YYYY"));

/*

  Changes dates to moment js string dates
changeIT();

async function changeIT() {
  const change = await User.updateMany(
    { _id: mongoose.Types.ObjectId("5cfb44bff02caf1bdc5a030c") },
    { date: moment() }
  );
  console.log(change.n);
  console.log(change.nModified);
}
*
/*
var treeData = [];
Category.find({ level: 0 }).then( categories => {
  categories.forEach((category) => {
    var node = {
      key: category.label,
      label: category.label,
      index: treeData.length,
      nodes: []
    }
    treeData.push(node);
    recursiveCat(node.nodes, category.label, category.children, treeData.length)

  })
})

function recursiveCat(nodes, parLabel, children, indexC){
  Category.find({ parent: parLabel }).then( categories => {
    categories.forEach((category) => {
      //console.log(category.children.length)
      var node = {
        key: category.label,
        label: category.label,
        index: indexC,
        nodes: []
      }
      nodes.push(node);
      recursiveCat(node.nodes, category.label, category.children, indexC);
    })
  })
}

const meme = setInterval(print, 3000);
function print(){
  for(var i=0; i < treeData.length; i++){
    recursivePrint(treeData[i]) 
  }
}

function recursivePrint(node){
  console.log(node)
  for(var i=0; i < node.nodes.length; i++){
    recursivePrint(node.nodes[i])
  }
}
    /*
    if (treeData[0]==""){
      treeData[0]=node;
    }
    else{
      treeData.push(node);
    }
    */

/*
var catNode = {
  key: 'Video Games',
  label: 'Video Games',
  index: 0,
  nodes: returnCatChildren()
}

async function returnCatChildren() {
  return(
    [
      createNode('node1', 0),
      createNode('node2', 0)
    ]
  )
};



function createNode(label, index){
  var node = {
    key: label,
    label: label,
    index: index
  }
  return (node);
};



*/
/*
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
*/
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
