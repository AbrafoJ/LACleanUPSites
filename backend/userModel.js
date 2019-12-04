var mongoose = require('mongoose')

var mongoDB = 'mongodb://127.0.0.1/KnownSites';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});

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

var userSchema = new Schema(
	{
		userName: { type: String, required: true, unique: true},
		passwordHash: { type: String, required : true, unique: true},
		favorites: [String],
		deleted: [String]
		
	});

var userModel = mongoose.model('userModel', userSchema);

var testUserInstance = new userModel({
	userName: 'Flo',
	passwordHash: 'hardcarry',
	favorites:['5de6f5e0dbfbe94534d9c21c','5de6f5e0dbfbe94534d9c225'],
	deleted: []
});

testUserInstance.save(function (err) {
	console.log('Attempting to save');
	if (err) {
		console.error(err);
	}
	console.log('Probably saved');
})

/*
userModel.find({'userName':'Flo'}, 'userName passwordHash favorites', function(err, users){
	if (err) {
		console.log(err)
	}
	for (let user of users){
		console.log(user.favorites)
	}
});
*/
module.exports = mongoose.model("userModel", userSchema);
//console.log("Everything works alright if you make it to this point in the code");
