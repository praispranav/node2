var express = require('express');
const bodyParser = require('body-parser');

const promotionRouter = express.Router()
promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next();
})
.get((req,res,next)=>{
    res.end("here You will get all promotions ...")
})
.post((req,res,next)=>{
    res.end("here you can add some promotions .... ")    
})
.put((req,res,next)=>{
    res.end("This is operation is not supported ... ")
})
.delete((req,res,next)=>{
    res.end("this will delete all promotions")
});

promotionRouter.route('/:promoId')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-type','text/html');
    next();
})
.get((req,res,next)=>{
    res.end("here You will get info about leader having id : " + req.params.promoId );
})

.post((req,res,next)=>{
    res.end("This operations is not supported... ")
})
.put((req,res,next)=>{
    res.end("this will edit the dish havind id :" + req.params.promoId)
})
.delete((req,res,next)=>{
    res.end("this will delete dish having Id : "+ req.params.promoId)
});

module.exports = promotionRouter;