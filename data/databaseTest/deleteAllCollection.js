//allows people to delete the entire collection sites in the KnownSites DB
//follows the same format as the other basic mongod js scripts

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("KnownSites");
  //var siteobj = [
        //{id: '1', address: '2020,BLOOMFIELD AVE 90703'},

  dbo.collection("sites").deleteMany({}, function(err, res) {
    if (err) throw err;
    console.log("Number of documents deleted: " + res.deletedCount + ". Ack message: " + res.acknowledged);
    //console.log(Object.keys(res)); Shows the keys for the response object
    db.close();
  });
});

