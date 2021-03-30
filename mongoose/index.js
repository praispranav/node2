var mongoose = require('mongoose')
var Dishes = require("./model/dish");

const url = 'mongodb://localhost/conFusion';

mongoose.connect(url)
.then((db)=>{
    console.log("Mongoose database Connection Succss");

    var newDish = Dishes({
        name:"uthapizza",
        description:"this is description"
    })

    newDish.save()
    .then((dish)=>{
        console.log("Your dish was"+ dish);
        return Dishes.findByIdAndUpdate(dish._id,{
            $set: {description:"Updated text"}
        },{
            new: true
        }).exec();
    })
    .then((dish)=>{
        console.log(dish);
        dish.comments.push({
            author:"Pranav",
            rating: 2,
            comment: "I love you."
        })
        return dish.save()
        // return Dishes.deleteMany({});

    })
    .then((result)=>{
        console.log("Your dish was"+ result);
    })
    .then(()=>{
        return mongoose.connection.close();
    })
    .catch((err)=>{
        console.log(err)
    })
})