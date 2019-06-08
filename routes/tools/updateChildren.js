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

label = "Combat Sports";
childArray =
    [
        "Wrestling",
        "Boxing",
        "Judo",
        "Karate",
        "Jiu-Jitsu",
        "Fencing",
        "Muay Thai",
        "Mixed Martial Arts",
        "Capoeira",
        "Sambo",
        "Kung Fu"
    ]

updateChildren(label, childArray);

function updateChildren(targetLabel, children){
  Category.findOneAndUpdate({label: targetLabel},{$set:{children: children}})
    .then( category => {
        if(category){
            console.log("Result: ", JSON.stringify(category));
            return category;
        } else {
            console.log("category with label not found");
        }
  })
}


