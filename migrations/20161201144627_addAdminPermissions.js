
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', function (table) {
    table.boolean('isAdmin').defaultTo(false).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', function (table) {
    table.dropColumn('isAdmin');
  });
};
