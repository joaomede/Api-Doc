import * as Knex from 'knex'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up (knex: Knex): Promise<any> {
  return knex.schema.createTable('team_rules', table => {
    table.increments()
    table.timestamps(true, true)
    table.integer('teamIdFk').unsigned().references('id').inTable('teams').onDelete('CASCADE').index()
    table.integer('userIdFk').unsigned().references('id').inTable('users').onDelete('CASCADE').index()
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down (knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('team_rules')
}
