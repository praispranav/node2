var express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router()
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next();
})
.get((req,res,next)=>{
    res.end("here You will get all dishes ...")
})
.post((req,res,next)=>{
    res.end("here you can add some dishes .... ")    
})
.put((req,res,next)=>{
    res.end("This is operation is not supported ... ")
})
.delete((req,res,next)=>{
    res.end("this will delete all dishes")
});

dishRouter.route('/:dishId')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-type','text/html');
    next();
})
.get((req,res,next)=>{
    res.end("here You will get info about  dish having id : " + req.params.dishId );
})

.post((req,res,next)=>{
    res.end("This operations is not supported... ")
})
.put((req,res,next)=>{
    res.end("this will edit the dish havind id :" + req.params.dishId)
})
.delete((req,res,next)=>{
    res.end("this will delete dish having Id : "+ req.params.dishId)
});

module.exports = dishRouter;