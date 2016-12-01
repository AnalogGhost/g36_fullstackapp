var express = require('express');
var app = express();

var db = require('./knexfile.js')['development'];
var knex = require('knex')(db);

var bodyParser = require('body-parser');

var cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'session',
  keys: ['supersecretkey'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(function (req,res,next) {
  if (req.session.userId) {
    knex('users')
    .where({id:req.session.userId})
    .first()
    .then(function (result) {
      req.user = result;
      next();
    });
  } else {
    next();
  }
});

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
