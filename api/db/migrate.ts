import { knex } from '../db/connection'

knex.migrate.latest().then(() => {
  console.log('concluido')
  process.exit()
}).catch((err) => {
  console.log('error: ' + err)
})
