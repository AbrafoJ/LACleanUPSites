var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/sites';
mongoose.connect(mongoDB, { useNewUrlParser: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Define a schema using the mongoose Schema function
var Schema = mongoose.Schema;

//var SomeModelSchema = new Schema({
//	a_string: String,
//	a_date: Date,
//});

//the first argument 'SomeModel' is the singular name of the collection that will be
//created for your model
//var SomeModel = mongoose.model('SomeModel', SomeModelSchema);

//defing the schema for our site
var siteSchema = new Schema(
	{
		streetNumber: Number,
		address: String,
		zip: Number
	});
//deinf themodel based on the schema
var siteModel = mongoose.model('siteModel', siteSchema);

/*
var awesome_site_instance = new siteModel({ streetNumber: 9315, address: 'Dalewood Ave', zip: 90240})


awesome_site_instance.save(function (err) {
	if (err) return handleError(err);
	//saved!
});


siteModel.create({streetNumber: 9312,address: 'also_awesome',zip:90240 }, function (err, awesome_insance) {
	if(err) return handleError(err);
	else console.log(awesome_site_instance.streetNumber)
	//saved!
});

siteModel.find({'zip': 90240}, 'streetNumber address', function(err, sites){
	if(err) return handleError(err);
	//'sites' contains the list of athletes that match the criteria
	for (let site of sites){
		console.log(site.streetNumber)
	}
});
*/
module.exports = mongoose.model("Sites", siteSchema);


