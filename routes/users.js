var express = require('express');
var route = express.Router();
var bcrypt = require('bcrypt');

var db = require('../knexfile.js')['development'];

var knex = require('knex')(db);

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
        res.sendStatus(201);
      })
      .catch(function (err) {
        next(err);
      });
    } else {
      res.status(400).send('User Already Exists');
    }
  });
});

route.use(function (req,res,next) {
  if (!req.user) {
    res.sendStatus(401)
  } else {
    next();
  }
});

route.get('/',function (req,res,next) {
  knex('users')
  .select('username')
  .then(function (results) {
    res.send(results);
  })
  .catch(function (err) {
    next(err);
  });
});

route.get('/:username', function (req,res,next) {
  knex('users')
  .select('username')
  .where({username: req.params.username})
  .first()
  .then(function (results) {
    if (results) {
      res.send(results);
    } else {
      res.sendStatus(404);
    }
  })
  .catch(function (err) {
    next(err);
  });
});

route.use(function (req,res,next) {
  if (!req.user.isAdmin) {
    res.sendStatus(401)
  } else {
    next();
  }
});
route.delete('/:username', function(req,res,next) {
  knex('users')
  .where({username: req.params.username})
  .del()
  .then(function () {
    res.sendStatus(200);
  })
  .catch(function (err) {
    next(err);
  });
});


module.exports = route;
