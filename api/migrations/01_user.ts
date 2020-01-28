import * as Knex from 'knex'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
    table.increments()
    table.text('name').notNullable()
    table.text('email').notNullable()
    table.text('password').notNullable()
    table.timestamps(true, true)
  })
}

export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users')
}
