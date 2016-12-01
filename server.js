var express = require('express');
var app = express();

var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));

var index = require('./routes/index');
var users = require('./routes/users');

app.use('/',index);
app.use('/users',users)

app.listen('3000', function () {
  console.log("Listening on port 3000");
});
