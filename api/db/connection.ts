import config from '../knexfile'
import Knex = require('knex')

export const knex = Knex(config[process.env.NODE_ENV || 'prod'] as Knex.Config)
