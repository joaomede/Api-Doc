import * as Knex from 'knex'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('api', table => {
    table.increments()
    table.text('apiName').notNullable()
    table.text('descriptionApi').notNullable()
    table.text('version').notNullable()
    table.text('email').notNullable()
    table.text('license').notNullable()
    table.text('baseURL').notNullable()
    table.boolean('isPublic').notNullable()
    table.timestamps(true, true)
    table.integer('userIdFk').unsigned().references('id').inTable('users').onDelete('CASCADE').index()
  })
}

export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('api')
}
