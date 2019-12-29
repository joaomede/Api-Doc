import * as Knex from 'knex'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up (knex: Knex): Promise<any> {
  return knex.schema.createTable('paths', table => {
    table.increments()
    table.text('verbType').notNullable()
    table.text('descriptionVerb').notNullable()
    table.text('path').notNullable()

    table.boolean('parameter1').notNullable()
    table.text('parameterName1').nullable()
    table.text('parameterValue1').nullable()

    table.boolean('parameter2').notNullable()
    table.text('parameterName2').nullable()
    table.text('parameterValue2').nullable()

    table.boolean('parameter3').notNullable()
    table.text('parameterName3').nullable()
    table.text('parameterValue3').nullable()

    table.json('headersValue').notNullable()

    table.boolean('body').notNullable()
    table.json('bodyValue').nullable()

    table.boolean('data').notNullable()
    table.text('dataType').nullable()
    table.text('dataValue').nullable()

    table.timestamps(true, true)
    table.integer('tagsIdFk').unsigned().references('id').inTable('tags').onDelete('CASCADE').index()
    table.integer('userIdFk').unsigned().references('id').inTable('users').onDelete('CASCADE').index()
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down (knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('paths')
}
