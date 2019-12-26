import c from '../controllers/Auth'
import validate from '../utils/Validation'
import { Router } from 'express'

const routes = Router()

routes.post('/api/api/auth/login', validate.login, c.auth)
routes.post('/api/api/auth/register', validate.register, c.register)
routes.post('/auth/forgot', c.forgotPassword)
routes.post('/auth/reset', c.resetPassword)
routes.post('/auth/alterarsenha', c.alterarSenha)

// Danger
routes.put('/auth/atualizarfuncao', c.atualizaFuncao)
routes.get('/auth/listausuarios', c.listaUsuarios)
routes.delete('/auth/apagaruser/:refId', c.apagarUser)

export default routes
