import c from '../controllers/controllerAuth'
// import validate from '../utils/Validation'
import { Router } from 'express'

const routes = Router()

routes.post('/auth/login', c.auth)
routes.post('/auth/register', c.register)
routes.post('/auth/forgot', c.forgotPassword)
routes.post('/auth/reset', c.resetPassword)
routes.post('/auth/alterarsenha', c.alterarSenha)
routes.post('/auth/verificatoken', c.verificaToken)

// Danger
routes.put('/auth/atualizarfuncao', c.atualizaFuncao)
routes.get('/auth/listausuarios', c.listaUsuarios)
routes.delete('/auth/apagaruser/:refId', c.apagarUser)

export default routes
