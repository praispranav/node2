const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');
const dboper = require('./operations') 

const url = 'mongodb://localhost:27017';
const dbname= 'conFusion';

MongoClient.connect(url,(err,client)=>{
    assert.equal(err,null);

    console.log("Database Connection success To conFusion");
    const db = client.db(dbname);
    const collection = db.collection("dishes");
    collection.insertOne({"name":"Uthapizza","description":"Hello this is first description"},(err,result)=>{
        assert.equal(err,null);

        console.log("data Inserted");
        console.log(result.ops);

        collection.find({}).toArray((err,docs)=>{
            assert.equal(err,null);

            console.log("FOund : \n");
            console.log(docs);
            
            db.dropCollection("dishes",(err,result)=>{
                assert.equal(err,null);

                console.log(result);
                client.close();
            })
        })
    })

})