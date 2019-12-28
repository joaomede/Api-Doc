import c from '../controllers/Public'
import { Router } from 'express'

const routes = Router()

routes.get('/api/geral/getapiandtags/:id', c.getApiAndEndPoints)
routes.get('/api/geral/getpathsandresponses/:endPointId', c.getVerbsAndCodes)
routes.get('/api/geral/listallpublicapi', c.listAllPublicApi)

export default routes
