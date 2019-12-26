import * as Knex from 'knex'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up (knex: Knex): Promise<any> {
  return knex.schema.createTable('api', table => {
    table.increments()
    table.text('apiName').notNullable()
    table.text('descriptionApi').notNullable()
    table.text('version').notNullable()
    table.boolean('isPublic').notNullable()
    table.date('createdAt').notNullable()
    table.date('updatedAt').notNullable()
    table.integer('userIdFk').unsigned().references('id').inTable('user').onDelete('CASCADE').index()
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down (knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('api')
}
