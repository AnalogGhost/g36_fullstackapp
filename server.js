var express = require('express');
var app = express();

var bodyParser = require('body-parser');


app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

var index = require('./routes/index');
var users = require('./routes/users');

app.use('/',index);
app.use('/users',users)

app.listen('3000', function () {
  console.log("Listening on port 3000");
});
