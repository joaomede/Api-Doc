import * as dotenv from 'dotenv'
import * as knex from 'knex'
import * as path from 'path'
dotenv.config()
export default {
  dev: {
    client: 'pg',
    connection: {
      port: process.env.PORTDB,
      host: process.env.HOSTDB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB
    },
    migrations: {
      extension: 'ts',
      directory: path.join(__dirname, './migrations')
    }
  },
  dev1: {
    client: 'sqlite3',
    connection: {
      filename: './mydb.sqlite'
    },
    migrations: {
      extension: 'ts',
      directory: path.join(__dirname, './migrations')
    },
    useNullAsDefault: true
  },
  prod: {
    client: 'pg',
    connection: {
      port: process.env.PORTDB,
      host: process.env.HOSTDB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB
    },
    migrations: {
      extension: 'ts',
      directory: path.join(__dirname, './migrations')
    }
  }
} as knex.Config
