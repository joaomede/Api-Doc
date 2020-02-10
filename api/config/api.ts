import ApiDoc from 'api-doc-js-sdk'
import * as env from './env'
import * as path from 'path'

const config = {
  dev: {
    client: 'pg',
    connection: {
      port: process.env.PORTDB,
      host: process.env.HOSTDB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB
    },
    pool: { min: 0, max: 10, idleTimeoutMillis: 500 }
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
}

export default new ApiDoc(config.dev, env.env.secret)
