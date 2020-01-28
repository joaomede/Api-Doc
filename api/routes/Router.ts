import { Router } from 'express'
import apiValidate from '../utils/ApiValidate'
import tagsValidate from '../utils/TagsValidation'
// import pathsValidate from '../utils/PathsValidate'
// import responsesValidade from '../utils/ResponsesValidation'
import CheckJwt from '../middlewares/CheckJwt'

import cTeam from '../controllers/Team'
import cApi from '../controllers/Api'
import cTags from '../controllers/Tags'
import cPaths from '../controllers/Path'
import cResponses from '../controllers/Responses'
const routes = Router()

routes.use(CheckJwt.checkJwt)

// * //
// Teams
routes.post('/api/team/create', cTeam.store)
routes.get('/api/team/getall', cTeam.index)
routes.put('/api/team/update/:id', cTeam.update)
routes.delete('/api/team/delete/:id', cTeam.destroy)
routes.post('/api/team/addmember', cTeam.addMember)
routes.delete('/api/team/deletemember/:id', cTeam.removeMember)
routes.get('/api/team/listallmembers/:teamIdFk', cTeam.listAllMembers)

// * //
// API
routes.post('/api/api/create', apiValidate.create, cApi.store)
routes.get('/api/api/get/:apiId', cApi.indexOne)
routes.get('/api/api/getall', cApi.index)
routes.get('/api/api/getallprivate', cApi.indexPrivate)
routes.delete('/api/api/delete/:id', cApi.destroy)
routes.put('/api/api/update/:id', cApi.update)
// API populate
routes.get('/api/api/getapiandendpoints/:id', cApi.getApiAndEndPoints)
routes.get('/api/api/getPathAndResponses/:tagId', cApi.getPathAndResponses)

// * //
// Endpoint
routes.post('/api/tags/create/:apiId', tagsValidate.create, cTags.store)
routes.get('/api/tags/getall/:apiId', cTags.index)
routes.delete('/api/tags/delete/:id', cTags.destroy)
routes.put('/api/tags/update/:id', cTags.update)

// * //
// Verbs
routes.post('/api/paths/create/:tagId', cPaths.store)
routes.get('/api/paths/getall/:tagId', cPaths.index)
routes.delete('/api/paths/delete/:id', cPaths.destroy)
routes.put('/api/paths/update/:id', cPaths.update)

// * //
// Codes Response
routes.post('/api/responses/create/:verbId', cResponses.store)
routes.get('/api/responses/getall/:verbId', cResponses.index)
routes.delete('/api/responses/delete/:id', cResponses.destroy)
routes.put('/api/responses/update/:id', cResponses.update)

export default routes
