import c from '../controllers/Auth'
import validate from '../utils/Validation'
import { Router } from 'express'

const routes = Router()

routes.post('/api/auth/login', validate.login, c.auth)
routes.post('/api/auth/register', validate.register, c.register)
routes.put('/api/auth/changepassword', c.changePassword)

export default routes
