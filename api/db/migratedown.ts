import { knex } from '../db/connection'

knex.migrate.down().then(() => {
  console.log('migrate down concluído')
  process.exit()
}).catch((err) => {
  console.log('error: ' + err)
})
