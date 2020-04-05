import * as dotenv from 'dotenv'
dotenv.config()

export const env = {
  port: 80,
  host: process.env.HOSTDB,
  postgresUser: process.env.POSTGRES_USER,
  postgresPassword: process.env.POSTGRES_PASSWORD,
  postgresDatabase: process.env.POSTGRES_DB,
  nodeEnv: process.env.NODE_ENV,
  secret: process.env.SECRET
}
