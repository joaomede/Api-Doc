import { Router } from 'express'
import CheckJwt from '../middlewares/CheckJwt'
import CheckRules from '../middlewares/CheckRules'

import cApi from '../controllers/Api'
import cTags from '../controllers/Tags'
import cPaths from '../controllers/Path'
import cResponses from '../controllers/Responses'
const routes = Router()

routes.use(CheckJwt.checkJwt)
routes.use(CheckRules.checkRules)

// * //
// API
routes.get('/api/team/api/get/:apiId', cApi.indexOne)
routes.get('/api/team/api/getall', cApi.index)

// API populate
routes.get('/api/team/api/getapiandendpoints/:id', cApi.getApiAndEndPoints)
routes.get('/api/team/api/getverbsandcodes/:endPointId', cApi.getVerbsAndCodes)

// * //
// Endpoint
routes.get('/api/team/tags/getall/:apiId', cTags.index)

// * //
// Verbs
routes.get('/api/team/paths/getall/:endPointId', cPaths.index)

// * //
// Codes Response
routes.get('/api/team/responses/getall/:verbId', cResponses.index)

export default routes
