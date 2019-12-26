import { Router } from 'express'
import check from '../controllers/Checkin'
import CheckJwt from '../middlewares/CheckJwt'

const routes = Router()
routes.use(CheckJwt.checkJwt)

routes.get('/api/auth/checkin', check.checkin)

export default routes
