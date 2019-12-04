//This inserts all the sites located in the 'jsonSites' json file
 
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var fs = require('fs');
var jsonFile = require('./merged_data.json');
//const jsonFP = 'jsonSites.json'
//var jsonObj = JSON.parse(jsonFP);

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("KnownSites");
  //var siteobj = [
    	//{id: '1', address: '2020,BLOOMFIELD AVE 90703'},

  dbo.collection("sites").insertMany(jsonFile, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    //console.log(res); --Only un-comment this if you need to see the response object values
    //console.log(Object.keys(res)); //shows the response object keys
    db.close();
  });
});
