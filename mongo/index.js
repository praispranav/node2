const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');
const dboper = require('./operations')

const url = 'mongodb://localhost:27017';
const dbname= 'conFusion';

MongoClient.connect(url,(err,client)=>{

    console.log("Database Connection success To conFusion");
    const db = client.db(dbname);
    dboper.insertDocument(db, {name:"vadolnut", description:"this is forst description"},"dishes")
    .then((result)=>{
      console.log("Data Inserted ", result.ops);
      return dboper.findDocuments(db,"dishes")
    })
    .then((docs)=>{
      console.log("Document Found", docs);
      return dboper.updateDocument(db,{name:"vadolnut"},{description:"this is updated document"},"dishes");
    })
    .then((result)=>{
      console.log("Document Updated", result.result);
      const findDoc = dboper.findDocuments(db,"dishes")
      console.log(findDoc);
      return dboper.findDocuments(db,"dishes")
    })
    .then((docs)=>{
      console.log("Updated Document is :"+ docs)
      return db.dropCollection("dishes")
    })
    .catch((err)=>{
      console.log("AnError Occoured White finding documents")
      db.dropCollection("dishes")
      return client.close()
    })

})
