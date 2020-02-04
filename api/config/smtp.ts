import * as dotenv from 'dotenv'
dotenv.config()

export const config = {
  host: process.env.HOSTSMTP,
  port: process.env.PORTSMTP,
  secure: false,
  user: process.env.EMAIL,
  pass: process.env.PASSWORDSMPT,
  tls: {
    rejectUnauthorized: false
  }
}
