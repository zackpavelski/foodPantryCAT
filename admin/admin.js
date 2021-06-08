webPreferences: {
            nodeIntegration: true
        }
function pull(){
  //const MongoClient = import MongoClient from 'mongodb';
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://admin:root@cluster0.wqb27.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  //connect to mongodb and push data.
  client.connect(err => {
    const collection = client.db("pantry").collection("items");
    console.log('connected!');
    var result = collection.find({"macro":"protein"});
    console.log(result.pretty());
    //var myobj = { name: "Company Inc", address: "Highway 37" };
    //var dbObj = {name: "NEEDS NAME", orderQuantity: "INT", items="ITEMS"};
    //find = collection.insertOne(dbObj);   
    client.close();
  });

}