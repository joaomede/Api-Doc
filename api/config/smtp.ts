import * as dotenv from 'dotenv'
dotenv.config()

export const smtp = {
  secure: false,
  user: process.env.EMAIL,
  pass: process.env.PASSWORDSMPT,
  tls: {
    rejectUnauthorized: false
  }
}
