var bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  var hash = bcrypt.hashSync('nimda', 8);

  return knex('users').insert(
    {
      username: 'admin',
      password_hash: hash,
      isAdmin: true
    }
  );
};
