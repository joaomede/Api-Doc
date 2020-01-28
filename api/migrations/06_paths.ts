import * as Knex from 'knex'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('paths', table => {
    table.increments()
    table.text('methodType').notNullable()
    table.text('pathName').notNullable()
    table.text('descriptionVerb').notNullable()
    table.text('path').notNullable()

    table.json('parameter').notNullable()
    table.json('headersValue').notNullable()
    table.json('bodyValue').nullable()
    table.json('data').notNullable()

    table.timestamps(true, true)
    table.integer('tagsIdFk').unsigned().references('id').inTable('tags').onDelete('CASCADE').index()
    table.integer('userIdFk').unsigned().references('id').inTable('users').onDelete('CASCADE').index()
  })
}

export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('paths')
}
