import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import { config } from '../config/config'
import path = require('path')

const { host, port, secure, user, pass, tls } = config

const transport = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: { user, pass },
  tls
})

const handlebarOptions = {
  viewEngine: {
    extname: '.html',
    defaultLayout: 'forgot_password',
    partialsDir: path.join(__dirname, '../resources/mail/auth/'),
    layoutsDir: path.join(__dirname, '../resources/mail/auth/')
  },
  viewPath: 'src/resources/mail',
  extName: '.html'
}

transport.use('compile', hbs(handlebarOptions))

export default transport
