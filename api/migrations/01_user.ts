import * as Knex from 'knex'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up (knex: Knex): Promise<any> {
  return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
    table.increments()
    table.text('name').notNullable()
    table.text('email').notNullable()
    table.text('password').notNullable()
    table.timestamps(true, true)
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down (knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('users')
}
