const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
//using Sites, not data
const Sites  = require('./mongooseModels.js');
const Users = require('./userModel.js');

//const API_PORT = 80
const API_PORT = 4200;
const app = express();
app.use(cors());
const router = express.Router();

//this is our mongodb database
const dbRoute = 'mongodb://127.0.0.1/KnownSites';

mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true});

let db = mongoose.connection;

db.once('open',() => console.log('Connected to the database'));

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//optional -- only made for logging
//and bodyParser parses the request body to be a readable json format
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

//this is our get method
//this method fecthes all available data in our database

router.get('/getSites',(req, res) => {
	Sites.find((err, data) => {
		if (err) return res.json({ success: false, error: err});
		return res.json(data);
		//return res.json({success: true, data: data});
	});
});
// you send a username and it grabs favorites
router.get('/getUsers', (req, res) => {
	Users.find({},'userName',(err,data) => {
			if(err) return res.json({success: false, error: err});
			return res.json(data);
			//return res.json({sucess:true, data: data});
	});
});
router.post('/favorites',(req, res) => {
	const { user } = req.body;
	console.log('server',user);
	Users.find({'userName': user}, 'userName favorites', function(err, data){
		if(err) console.log(err);
		console.log('server2 data', data)
		res.json({favorites:data});
	});
});
router.get('/flo',(req, res) => {
	var check = 'Flo';//usernamme to check against
	console.log('server',check);
	Users.find({'userName': check}, 'userName favorites', function(err, data){
		if(err) console.log(err);
		console.log('server2 data', data)
		res.json(data);
	});
});


router.post('/checkHash', (req, res, next) => {
	console.log('This is not yet implemented');
});

//this is our update method
router.post('/updateData', (req, res) => {
	const {id, update} = req.body;
	Sites.findByIdAndUpdate(id, update, (err) => {
		if (err) return res.json({success: false, error: err});
		return res.json({success: true});
	});
});

//this is our delete method
//this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
	const { id } = req.body;
	Sites.findByIdAndRemove(id, (err) => {
		if (err) return res.send(err);
		return res.json({success: true});
	});
});

//this is our create method
//this method adds new data in our database
router.post('/putData', (req, res) => {
	let data = new Sites();

	const { id, message } = req.body;

	if ((!id && id !== 0) || !message) {
		return res.json({
			sucess: false,
			error: 'INVALID INPUTS',
		});
	}
	data.message = message;
	data.id = id;
	data.save((err) => {
		if (err) return res.json({ success: false, error: err});
		return res.json({ success: true });
	});
});

router.post('/updateFavorites', (req, res) => {
	let user = new Users();
	const {username, siteid} = req.body;
	
	user.update({'userName': username}, 
		{'$push': { 'favorites': siteid} },
		{'new': true,'upsert': true},
		function (err, raw){
			console.log('server updating')
			if(err) return res.jso({ sucess: false, error: err});
			console.log('Mongo raw error: ', raw);
		}
	)
	return res.json({ success: true }); 
});
//,api parameter removed
app.use( router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

