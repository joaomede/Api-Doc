import * as dotenv from 'dotenv'
dotenv.config()

export const env = {
  portHttp: process.env.HTTPSERVERPORT,
  portApi: process.env.APIPORT,
  portDB: process.env.PORTDB,
  hostDB: process.env.HOSTDB,
  postgresUser: process.env.POSTGRES_USER,
  postgresPassword: process.env.POSTGRES_PASSWORD,
  postgresDatabase: process.env.POSTGRES_DB,
  nodeEnv: process.env.NODE_ENV,
  secret: process.env.SECRET
}