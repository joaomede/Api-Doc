import * as Knex from 'knex'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('team_rules', table => {
    table.increments()
    table.timestamps(true, true)
    table.integer('teamIdFk').unsigned().references('id').inTable('teams').onDelete('CASCADE').index()
    table.integer('userIdFk').unsigned().references('id').inTable('users').onDelete('CASCADE').index()
  })
}

export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('team_rules')
}
