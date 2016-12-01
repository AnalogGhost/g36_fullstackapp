var express = require('express');
var route = express.Router();


route.get('/',(req,res,next) => {
  res.send('Users');
});

route.post('/', (req,res,next) => {
  res.send(req.body);
});

module.exports = route;
