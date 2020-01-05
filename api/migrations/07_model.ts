import * as Knex from 'knex'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up (knex: Knex): Promise<any> {
  return knex.schema.createTable('models', table => {
    table.increments()
    table.json('model').notNullable()
    table.timestamps(true, true)
    table.integer('tagsIdFk').unsigned().references('id').inTable('tags').onDelete('CASCADE').index()
    table.integer('userIdFk').unsigned().references('id').inTable('users').onDelete('CASCADE').index()
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down (knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('models')
}
