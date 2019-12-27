import c from '../controllers/Public'
import { Router } from 'express'

const routes = Router()

routes.get('/api/geral/getapiandendpoints/:id', c.getApiAndEndPoints)
routes.get('/api/geral/getverbsandcodes/:endPointId', c.getVerbsAndCodes)
routes.get('/api/geral/api/geral/listallpublicapi', c.listAllPublicApi)

export default routes
