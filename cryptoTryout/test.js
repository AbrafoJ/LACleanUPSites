const express = require('express');
const app = express();
const port = 4002;

app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.listen(port, () => console.log(`App listening on ${port}`));
