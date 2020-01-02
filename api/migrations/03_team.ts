import * as Knex from 'knex'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up (knex: Knex): Promise<any> {
  return knex.schema.createTable('teams', table => {
    table.increments()
    table.text('teamName').notNullable()
    table.timestamps(true, true)
    table.integer('apiIdFk').unsigned().references('id').inTable('api').onDelete('CASCADE').index()
    table.integer('managerIdFk').unsigned().references('id').inTable('users').onDelete('CASCADE').index()
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down (knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('teams')
}
