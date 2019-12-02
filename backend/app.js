var birds = require('./test.js')
var app = require('express')();

app.use('/birds', birds)

app.listen(3000);
console.log('Should be listening on port 3000');
