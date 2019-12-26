import c from '../controllers/Geral'
import { Router } from 'express'

const routes = Router()

routes.get('/api/geral/getpublicdoc/:id', c.getPublicDoc)

export default routes
