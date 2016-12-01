var express = require('express');
var app = express();

var index = require('./routes/index');
var users = require('./routes/users');

app.use('/',index);
app.use('/users',users)

app.listen('3000', function () {
  console.log("Listening on port 3000");
});
