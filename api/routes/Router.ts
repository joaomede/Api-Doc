import { Router } from 'express'
import validate from '../utils/Validation'
import CheckJwt from '../middlewares/CheckJwt'

import cApi from '../controllers/controllerApi'
import cEndPoint from '../controllers/controllerEndPoint'
import cVerbs from '../controllers/controllerVerbs'
import cCodeResp from '../controllers/controllerCodesResp'
const routes = Router()

routes.use(CheckJwt.checkJwt)

routes.post('/api/api/create', cApi.store)
routes.get('/api/api/get/:apiId', cApi.indexOne)
routes.get('/api/api/listall/:campo/:sortValue', cApi.index)
routes.delete('/api/api/delete/:pastaId', cApi.destroy)
routes.put('/api/api/update/:id', cApi.update)

routes.post('/api/endpoint/:apiId', cEndPoint.store)

routes.post('/api/verb/store/:endPointId', cVerbs.store)

routes.post('/api/codesresp/create/:verbsId', cCodeResp.store)

export default routes
