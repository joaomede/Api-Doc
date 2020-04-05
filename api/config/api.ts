import ApiDoc from 'api-doc-js-sdk'
import * as env from './env'
import * as path from 'path'

const config = {
  dev: {
    client: 'pg',
    connection: {
      port: undefined,
      host: env.env.host,
      user: env.env.postgresUser,
      password: env.env.postgresPassword,
      database: env.env.postgresDatabase
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
      port: undefined,
      host: env.env.host,
      user: env.env.postgresUser,
      password: env.env.postgresPassword,
      database: env.env.postgresDatabase
    },
    migrations: {
      extension: 'ts',
      directory: path.join(__dirname, './migrations')
    }
  }
}

export default new ApiDoc(config.dev, env.env.secret)
