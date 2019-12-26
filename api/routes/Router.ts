import { Router } from 'express'
import apiValidate from '../utils/ApiValidate'
import CheckJwt from '../middlewares/CheckJwt'

import cApi from '../controllers/Api'
import cEndPoint from '../controllers/EndPoint'
import cVerbs from '../controllers/Verb'
import cCodeResp from '../controllers/CodesResp'
const routes = Router()

routes.use(CheckJwt.checkJwt)

routes.post('/api/api/create', apiValidate.create, cApi.store)
routes.get('/api/api/get/:apiId', cApi.indexOne)
routes.get('/api/api/getall/', cApi.index)
routes.delete('/api/api/delete/:id', cApi.destroy)
routes.put('/api/api/update/:id', cApi.update)

routes.post('/api/endpoint/:apiId', cEndPoint.store)

routes.post('/api/verb/store/:endPointId', cVerbs.store)

routes.post('/api/codesresp/create/:verbsId', cCodeResp.store)

export default routes
