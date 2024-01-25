/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('lists', (table) => {
    table.increments('id').primary()
    table.text('title').notNullable()
    table.text('description')
    table.text('image')
    table.json('heroes')

    table.integer('user_id').unsigned().notNullable()
    table.foreign('user_id').references('id').inTable('users')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('lists')
};
