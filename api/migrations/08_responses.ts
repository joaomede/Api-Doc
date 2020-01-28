import * as Knex from 'knex'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('responses', table => {
    table.increments()
    table.text('typeCode').notNullable()
    table.json('responseModel').notNullable()
    table.timestamps(true, true)
    table.integer('pathsIdFk').unsigned().references('id').inTable('paths').onDelete('CASCADE').index()
    table.integer('userIdFk').unsigned().references('id').inTable('users').onDelete('CASCADE').index()
  })
}

export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('responses')
}
