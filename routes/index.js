var express = require('express');
var route = express.Router();

var bcrypt = require('bcrypt');

var db = require('../knexfile.js')['development'];
var knex = require('knex')(db);

route.get('/',(req,res,next) => {
  res.send('Root');
});

route.post('/login', (req,res,next) => {
  if (!req.body.username || !req.body.password) {
    res.sendStatus(400);
  }

  knex('users')
  .where({username: req.body.username})
  .first()
  .then(function (result) {
    if (!result || !bcrypt.compareSync(req.body.password,result.password_hash)) {
      res.sendStatus(401);
    } else {
      req.session.userId = result.id
      res.redirect('/');
    }
  })

});

module.exports = route;
