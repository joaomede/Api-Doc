import * as Knex from 'knex'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up (knex: Knex): Promise<any> {
  return knex.schema.createTable('responses', table => {
    table.increments()
    table.text('typeCode').notNullable()
    table.text('reason').notNullable()
    table.text('responseModel').notNullable()
    table.text('headers').notNullable()
    table.timestamps(true, true)
    table.integer('pathsIdFk').unsigned().references('id').inTable('paths').onDelete('CASCADE').index()
    table.integer('userIdFk').unsigned().references('id').inTable('users').onDelete('CASCADE').index()
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down (knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('responses')
}
