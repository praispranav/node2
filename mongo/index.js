const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');
const dboper = require('./operations') 

const url = 'mongodb://localhost:27017';
const dbname= 'conFusion';

MongoClient.connect(url,(err,client)=>{
    assert.equal(err,null);

    console.log("Database Connection success To conFusion");
    const db = client.db(dbname);
    dboper.insertDocument(db, {name:"vadolnut", description:"this is forst description"},'dishes',(result)=>{
        console.log("Insert Document :\n",result.ops);
        
        dboper.findDocuments(db,'dishes',(docs)=>{
            console.log("FOund Documents :\n", docs);

            dboper.updateDocument(db,{name:"vadolnut"},{description:"this is test update"},'dishes',(result)=>{
                console.log("Updated Document : \n", result.result)

                db.dropCollection('dishes',(result)=>{
                    console.log("Collection Removed : ", result)
                    client.close();
                })
            })
        })
    })

})