import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as http from 'http'
import * as https from 'https'
import router from './routes/Router'
import routerAuth from './routes/RouterAuth'
import routerCheckin from './routes/RouterCheckin'
import routerGeral from './routes/RouterGeral'
import express = require('express')
import cors = require('cors')
dotenv.config()

class App {
  public express: express.Application
  private port: number
  private mode: string

  constructor () {
    this.port = (process.env.APIPORT as unknown as number)
    this.mode = process.env.NODE_ENV
    this.express = express()
    this.middlewares()
    this.routes()
  }

  private routes (): void {
    this.express.use(routerAuth)
    this.express.use(routerGeral)
    this.express.use(routerCheckin)
    this.express.use(router)
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  public server (): http.Server | https.Server {
    if (this.mode === 'prod') {
      const privateKey = fs.readFileSync(
        '/etc/letsencrypt/live/symbol2.tk/privkey.pem',
        'utf8'
      )
      const certificate = fs.readFileSync(
        '/etc/letsencrypt/live/symbol2.tk/cert.pem',
        'utf8'
      )
      const ca = fs.readFileSync(
        '/etc/letsencrypt/live/symbol2.tk/chain.pem',
        'utf8'
      )
      const credentials = { key: privateKey, cert: certificate, ca: ca }
      return https.createServer(credentials, this.express)
    } else {
      return http.createServer(this.express)
    }
  }

  public apiPort (): number {
    return this.port
  }
}

export default App
