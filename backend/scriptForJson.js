var app = require('express')();
var fs = require('fs');
var jsonObj = JSON.parse(fs.readFileSync('./jsonSites.json','utf8'));

var myLogger = function(req, res, next) {
	console.log('LOGGED')
	next();
};

app.use(myLogger);

app.use(function (req,res,next){
	res.status(404).send("Flo I can't find this!");
});

app.get('/',function(req,res,next)
{
	console.log('Someone made a request to the index!');
	next()
},
function(req,res){
	res.json(jsonObj);
})

app.route('/Flo')
	.get(function (req, res) {
		res.json(jsonObj)
	})
	.post(function (req, res){
		res.json(jsonObj)
	});


app.listen(3000);
console.log('Listening on PORT 3000');
