var mongoose = require('mongoose')

var mongoDB = 'mongodb://127.0.0.1/KnownSites';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Define a schema using the mongoose Schema function
var Schema = mongoose.Schema;
var siteSchema = new Schema(
	{
		streetNumber: Number,
		address: String,
		zip: Number
	});
//deinf themodel based on the schema
var siteModel = mongoose.model('siteModel', siteSchema);


module.exports = mongoose.model("sites", siteSchema);
