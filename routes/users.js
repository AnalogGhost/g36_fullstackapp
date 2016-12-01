var express = require('express');
var route = express.Router();
var bcrypt = require('bcrypt');

var db = require('../knexfile.js')['development'];

var knex = require('knex')(db);

route.get('/',(req,res,next) => {
  res.send('Users');
});

route.post('/', (req,res,next) => {
  var hash = bcrypt.hashSync(req.body.password, 8);

  knex('users')
  .where({username: req.body.username})
  .then(function (results) {
    if (results.length === 0) {
      knex('users')
      .insert({
          username: req.body.username,
          password_hash: hash
      })
      .then(function (result) {
        res.send("User Created");
      })
      .catch(function (err) {
        next(err);
      });
    } else {
      res.status(400).send('User Already Exists');
    }
  });
});

module.exports = route;
