var assert = require('assert');

exports.insertDocument = (db,collection,callback)=>{
 const coll = db.collection(collection);
 coll.insertOne(document,(err,result)=>{
     assert.equal(err,null);

     console.log("data Inserted" + result.result.n + "documents into the collection " +collection);
     callback(result);
 })   
}

exports.findDocuments = (db,collection,callback)=>{
    const coll = db.collection(collection);
    coll.find({}).toArray((err,docs)=>{
        assert.equal(err,null);
        callback(docs);
    }) 
}

exports.removeDocument = (db,collection,callback)=>{
    const coll = db.collection(collection);
    coll.deleteOne(document,(err,result)=>{
        assert.equal(err,null);
   
        console.log("Removed the document :" + document);
        callback(result);
    }) 
}

exports.updateDocument = (db,collection,callback)=>{
    const coll = db.collection(collection);
    coll.insertOne(document,{ $set: update },null,(err,result)=>{
        assert.equal(err,null);
   
        console.log("Updated The Document", update);
        callback(result);
    }) 
}