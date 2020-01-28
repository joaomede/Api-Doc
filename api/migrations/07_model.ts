import * as Knex from 'knex'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('models', table => {
    table.increments()
    table.json('model').notNullable()
    table.timestamps(true, true)
    table.integer('tagsIdFk').unsigned().references('id').inTable('tags').onDelete('CASCADE').index()
    table.integer('userIdFk').unsigned().references('id').inTable('users').onDelete('CASCADE').index()
  })
}

export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('models')
}
