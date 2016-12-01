var express = require('express');
var route = express.Router();

route.get('/',(req,res,next) => {
  res.send('Users');
});

module.exports = route;
