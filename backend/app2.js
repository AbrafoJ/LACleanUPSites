var express = require('express');
var app = express();
var cors = require('cors');
const data = require('./jsonSites.json');

app.use(cors());

app.get('/', function(req, res){
	res.json(data);
});

app.route('/Flo')
	.get(function (req, res) {
		res.json(data);
	})
	.post(function (req, res) {
		res.json(data);
	});

app.listen(3000, function(){
	console.log('CORS ENABLED MOFO  enabled');
});
console.log('hope were listening on 3000');
