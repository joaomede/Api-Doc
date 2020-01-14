import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as http from 'http'
import * as https from 'https'
import * as path from 'path'
import history = require('connect-history-api-fallback')
import cors = require('cors')
import express = require('express')
dotenv.config()

class HttpServer {
  public express: express.Application
  private port: number
  private mode: string

  constructor () {
    this.port = (process.env.HTTPSERVERPORT as unknown as number)
    this.mode = process.env.NODE_ENV
    this.express = express()
    this.middlewares()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(cors())
  }

  private routes (): void {
    this.express.use(express.static(path.join(__dirname, '../view/dist/spa')))
    this.express.use(
      history({
        index: '/index.html'
      })
    )
    this.express.use(express.static(path.join(__dirname, '../view/dist/spa')))
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

export default HttpServer
