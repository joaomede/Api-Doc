import * as Knex from 'knex'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up (knex: Knex): Promise<any> {
  return knex.schema.createTable('endpoint', table => {
    table.increments()
    table.text('nameEndPointsType').notNullable()
    table.text('descriptionEndPonitsType').notNullable()
    table.date('createdAt').notNullable()
    table.date('updatedAt').notNullable()
    table.integer('apiIdFk').unsigned().references('id').inTable('api').onDelete('CASCADE').index()
    table.integer('userIdFk').unsigned().references('id').inTable('user').onDelete('CASCADE').index()
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down (knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('endpoint')
}
