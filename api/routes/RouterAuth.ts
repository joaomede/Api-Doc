import c from '../controllers/Auth'
import validate from '../utils/Validation'
import { Router } from 'express'

const routes = Router()

routes.post('/api/auth/login', validate.login, c.auth)
routes.post('/api/auth/register', validate.register, c.register)
routes.post('/api/auth/forgot', c.forgotPassword)
routes.post('/api/auth/reset', c.resetPassword)
routes.post('api/auth/alterarsenha', c.alterarSenha)

// Danger
routes.put('/api//auth/atualizarfuncao', c.atualizaFuncao)
routes.get('/api/auth/listausuarios', c.listaUsuarios)
routes.delete('/api/auth/apagaruser/:refId', c.apagarUser)

export default routes
