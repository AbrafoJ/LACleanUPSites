const express = require('express');
const jwt = require('jwt-simple');
const API_PORT =  4002;
const uuid = ('uuid/v1');
const app = express();
const bodyParser = require('body-parser');

var cors = require('cors');
app.use (cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let secret = 'lemons';
let timeNow = new Date();

let payload = { created: new Date(),
		expires: new Date(timeNow.getHours() + 1),
		user: 'Matt',
};

var myLogger = function (req, res, next){
	console.log('LOGGED')
	next()
};

app.use(myLogger);

var requestTime = function (req, res, next) {
	req.requestTime = Date.now()
	next()
};

app.use(requestTime);

const token = jwt.encode(payload,secret);

app.get('/', function (req, res){
	res.send('Hello World');
});

app.get('/getToken', function (req, res) {
	var responseText = 'Hello World!<br>'+ req.requestTime ;
	res.json(token);
});


app.get('/checkToken', function (req, res) {
	var token = req.headers['x-access-token'];
	if (!token) return res.status(401).send({auth: false, message: 'No token provided.'});
	jwt.decode(token, secret, function (err, decoded) {
		if (err) return res.status(500).send({auth: false, message: 'Failed to authenticate token.' });
		res.status(200).send(decoded);
	});
});


app.listen(API_PORT, () => console.log(`App  listening on port ${API_PORT}`));

