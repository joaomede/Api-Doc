import App from './app'
import Http from './apphttp'
import * as dotenv from 'dotenv'
// import socketIO = require('socket.io')
dotenv.config()
const app = new App()
const serverStatic = new Http()

/* const server = */app.server().listen(app.apiPort(), () => {
  console.log(`App rodando na porta ${app.apiPort()}`)
})

// const io = socketIO(server)

serverStatic.server().listen(serverStatic.apiPort(), () => {
  console.log(`Server http rodando na porta ${serverStatic.apiPort()}`)
})

// const io = socket(app.server())
// export function sendEvent (e: string): void {
//   io.sockets.emit(e)
// };
