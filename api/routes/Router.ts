import { Router } from 'express'
import apiValidate from '../utils/ApiValidate'
import tagsValidate from '../utils/TagsValidation'
import pathsValidate from '../utils/PathsValidate'
import responsesValidade from '../utils/ResponsesValidation'
import CheckJwt from '../middlewares/CheckJwt'

import cApi from '../controllers/Api'
import cTags from '../controllers/Tags'
import cPaths from '../controllers/Paths'
import cResponses from '../controllers/Responses'
const routes = Router()

routes.use(CheckJwt.checkJwt)

// * //
// API
routes.post('/api/api/create', apiValidate.create, cApi.store)
routes.get('/api/api/get/:apiId', cApi.indexOne)
routes.get('/api/api/getall', cApi.index)
routes.delete('/api/api/delete/:id', cApi.destroy)
routes.put('/api/api/update/:id', cApi.update)
// API populate
routes.get('/api/api/getapiandendpoints/:id', cApi.getApiAndEndPoints)
routes.get('/api/api/getverbsandcodes/:endPointId', cApi.getVerbsAndCodes)

// * //
// Endpoint
routes.post('/api/tags/create/:apiId', tagsValidate.create, cTags.store)
routes.get('/api/tags/getall/:apiId', cTags.index)
routes.delete('/api/tags/delete/:id', cTags.destroy)
routes.put('/api/tags/update/:id', cTags.update)

// * //
// Verbs
routes.post('/api/paths/create/:endPointId', pathsValidate.create, cPaths.store)
routes.get('/api/paths/getall/:endPointId', cPaths.index)
routes.delete('/api/paths/delete/:id', cPaths.destroy)
routes.put('/api/paths/update/:id', cPaths.update)

// * //
// Codes Response
routes.post('/api/responses/create/:verbId', responsesValidade.create, cResponses.store)
routes.get('/api/responses/getall/:verbId', cResponses.index)
routes.delete('/api/responses/delete/:id', cResponses.destroy)
routes.put('/api/responses/update/:id', responsesValidade.create, cResponses.update)

export default routes
