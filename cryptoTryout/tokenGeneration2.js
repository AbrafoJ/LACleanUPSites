const express = require('express');
const jwt = require('jwt-simple');
const API_PORT =  6969;
const uuid = ('uuid/v1');
const app = express();


let secret = 'lemons';
let timeNow = new Date();

let payload = { created: new Date(),
		expires: new Date(timeNow.getHours() + 1),
		user: 'Matt',
}



/*
const token_object = {
	whew: tempTimeStamp),
	expires: new Date(tempTimeStap.getHours() + 1),
	'hashedToken':hashed_token,
}
*/

const token = jwt.encode(payload,secret);

app.get('/getToken', function (req, res) {
	res.json(token)
	res.send('Hi');
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

