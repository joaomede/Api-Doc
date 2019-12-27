import c from '../controllers/Geral'
import { Router } from 'express'

const routes = Router()

routes.get('/api/geral/getpublicdoc/:id', c.getPublicDoc)
routes.get('/api/geral/getpublicverb/:endPointId', c.getPublicVerb)
routes.get('/api/geral/indexpreviewpublicdoc', c.indexPreviewAllPublicDocs)

export default routes
