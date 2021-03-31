var mongoose = require("mongoose");
const Schema = mongoose.Schema

const commentsSchema = new Schema({
    author:{
        type:String,
        required: true
    },
    rating:{
        type: Number,
        max:5,
        min:1,
        required:true
    },
    comment:{
        type:String,
        required:true
    }

},{timestamps:true})

const dishSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String
    },
    label:{
        type:String,
        default: ''
    },
    category:{
        type:String
    },
    comments:[commentsSchema]
    
},{
    timestamps: true
}
)

var Dishes = mongoose.model("Dish",dishSchema);
module.exports = Dishes;