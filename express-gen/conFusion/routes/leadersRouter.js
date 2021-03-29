var express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router()
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next();
})
.get((req,res,next)=>{
    res.end("here You will get all leaders ...")
})
.post((req,res,next)=>{
    res.end("here you can add some leaders .... ")    
})
.put((req,res,next)=>{
    res.end("This is operation is not supported ... ")
})
.delete((req,res,next)=>{
    res.end("this will delete all leaders")
});

leaderRouter.route('/:leaderid')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-type','text/html');
    next();
})
.get((req,res,next)=>{
    res.end("here You will get info about leader having id : " + req.params.leaderId );
})

.post((req,res,next)=>{
    res.end("This operations is not supported... ")
})
.put((req,res,next)=>{
    res.end("this will edit the dish havind id :" + req.params.leaderId)
})
.delete((req,res,next)=>{
    res.end("this will delete dish having Id : "+ req.params.leaderId)
});

module.exports = leaderRouter;