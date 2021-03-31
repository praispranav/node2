var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../model/dish');

const dishRouter = express.Router()
dishRouter.use(bodyParser.urlencoded({extended:false}))
dishRouter.use(bodyParser.json())
// dishRouter.use(express.json());
// dishRouter.use(express.urlencoded({ extended: false }));

dishRouter.route('/')

.get((req,res,next)=>{
    Dishes.find({})
    .then((dishes)=>{
        res.statusCode= 200;
        res.setHeader('Content-Type',"application/json");
        res.json(dishes)
    },(err)=> next(err))
    .catch((err)=>{
        next(err);
    })
})
.post((req,res,next)=>{
    Dishes.create(req.body)
    .then((dish)=>{
        console.log("Your Dish Was :\n",dish)
        res.statusCode= 200;
        res.setHeader('Content-Type',"application/json");
        res.json(dish)
    },(err)=> next(err))
    .catch((er)=> next(err))
})
.put((req,res,next)=>{
    res.end("This is operation is not supported ... ")
})
.delete((req,res,next)=>{
    Dishes.deleteMany({})
   .then((resp)=>{
       console.log("all Items deleted")
    res.statusCode= 200;
    res.setHeader('Content-Type',"application/json");
    res.json(resp)
   },(err)= next(err))
   .catch((err)=> nect(err))
});

dishRouter.route('/:dishId')

.get((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        console.log("Your Dish Was :\n",dish)
        res.statusCode= 200;
        res.setHeader('Content-Type',"application/json");
        res.json(dish)
    },(err)=> next(err))
    .catch((er)=> next(err))
})

.post((req,res,next)=>{
    res.end("This operations is not supported... ")
})
.put((req,res,next)=>{
    Dishes.findByIdandUpdate(req.params.dishId, {
        $set : req.body
    },{ new : true} )
    .then((dish)=>{
        console.log("Your Dish Was :\n",dish)
        res.statusCode= 200;
        res.setHeader('Content-Type',"application/json");
        res.json(dish)
    },(err) => next(err))
    .catch((err)=> next(err))
})
.delete((req,res,next)=>{
    Dishes.deleteOne(req.params.dishId)
    .then((resp)=>{
        console.log("Item was Deleted");
        res.statusCode= 200;
        res.setHeader('Content-Type',"application/json");
        res.json(resp)
    },(err) => next(err))
    .catch((err) => next(err) )
});


dishRouter.route('/:dishId/comments')
.get((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if(dish != null){
            res.statusCode= 200;
            res.setHeader('Content-Type',"application/json");
            res.json(dish.comments)
        }
        else {
            err = new Error("Comments Not Found");
             err.statusCode = 404;
            return next(err)
        }
    },(err)=> next(err))
    .catch((err)=> next(err))
})
.post((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if (dish !=null){
            res.statusCode= 200;
            res.setHeader('Content-Type',"application/json");
            dish.comments.push(req.body)
            dish.save()
                .then((com)=>{
                    res.statusCode= 200;
                    res.setHeader('Content-Type',"application/json");
                    res.json(com)
                },(err)=> next(err))
        }
        else{
            err = new Error("Comments can be added to an error occured");
            err.statusCode = 404;
            return next(err)
        }
    },(err)=> next(err))
    .catch((err)=> next(err))
})
.delete((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if(dish !=null){
            res.statusCode= 200;
            res.setHeader('Content-Type',"application/json");
            dish.comments.deleteMany();
            res.end("All comments were deleted related to :"+ req.params.dishId)
        }
        else{
            err = new Error("Comments Cannot be deleted");
            err.statusCode = 404;
            return next(err)
        }
    },(err) => next(err))
    .catch((err)=> next(err))
})
.put((req,res,next)=>{
    res.end("This operation cannot be done")
});

dishRouter.route('./:dishId/comments/:commentId')
.get((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if(dish != null && dish.comments._id(req.params.commentId)){
            res.statusCode= 200;
            res.setHeader('Content-Type',"application/json");
            res.json(dish.comments.findById(req.params.commentId))
        }
        else {
            err = new Error("Comments Not Found");
             err.statusCode = 404;
            return next(err)
        }
    },(err)=> next(err))
    .catch((err)=> next(err))
})
.post((req,res,next)=>{
    res.end("This operation is not supported ")
})
.delete((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if(dish !=null && dish.comments.id(req.params.commentId)){
            res.statusCode= 200;
            res.setHeader('Content-Type',"application/json");
            dish.comments.id(req.params.commentId).deleteMany();
            res.end("All comments were deleted related to :"+ req.params.commentId)
        }
        else{
            err = new Error("Comments Cannot be deleted");
            err.statusCode = 404;
            return next(err)
        }
    },(err) => next(err))
    .catch((err)=> next(err))
})
.put((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if (dish !=null && dish.comments.id(req.params.commentId)){
            if (req.body.rating){
                dish.comments.id(req.params.commentId).rating = req.body.rating
            }
            if(req.body.comment){
                dish.comments.id(req.params.commentId).comment = req.body.comment
            }
            dish.save()
                .then((com)=>{
                    res.statusCode= 200;
                    res.setHeader('Content-Type',"application/json");
                    res.json(com)
                },(err)=> next(err))
        }
        else{
            err = new Error("Comments can be added to an error occured");
            err.statusCode = 404;
            return next(err)
        }
    },(err)=> next(err))
    .catch((err)=> next(err))
});

module.exports = dishRouter;