import * as Knex from 'knex'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up (knex: Knex): Promise<any> {
  return knex.schema.createTable('paths', table => {
    table.increments()
    table.text('verbType').notNullable()
    table.text('descriptionVerb').notNullable()
    table.text('path').notNullable()
    table.text('parameter').notNullable()
    table.text('verbValue').notNullable()
    table.text('paramsType').notNullable()
    table.text('respValue').notNullable()
    table.text('dataType').notNullable()
    table.timestamps(true, true)
    table.integer('tagsIdFk').unsigned().references('id').inTable('tags').onDelete('CASCADE').index()
    table.integer('userIdFk').unsigned().references('id').inTable('users').onDelete('CASCADE').index()
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down (knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('paths')
}
