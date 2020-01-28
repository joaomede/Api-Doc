import c from '../controllers/Public'
import { Router } from 'express'

const routes = Router()

routes.get('/api/geral/getapiandtags/:id', c.getApiAndTags)
routes.get('/api/geral/getpathsandresponses/:tagId', c.getPathAndResponses)
routes.get('/api/geral/listallpublicapi', c.listAllPublicApi)

export default routes
