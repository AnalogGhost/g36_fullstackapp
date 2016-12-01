var express = require('express');
var route = express.Router();
var bcrypt = require('bcrypt');

route.get('/',(req,res,next) => {
  res.send('Users');
});

route.post('/', (req,res,next) => {
  var hash = bcrypt.hashSync(req.body.password, 8);
  res.send({username: req.body.username, hash: hash});
});

module.exports = route;
