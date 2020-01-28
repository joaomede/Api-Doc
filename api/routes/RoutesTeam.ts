import { Router } from 'express'
import CheckJwt from '../middlewares/CheckJwt'

import cTeamQuery from '../controllers/TeamQuery'
const routes = Router()

routes.use(CheckJwt.checkJwt)

// * //
// API
routes.get('/api/teamdocs/listall', cTeamQuery.listTeamsIAmMember)
routes.delete('/api/teamdocs/delete/:id', cTeamQuery.exitTeam)

// // API populate
routes.get('/api/teamdocs/api/getapiandtags/:id', cTeamQuery.getApiAndTags)
routes.get('/api/teamdocs/api/getPathAndResponses/:id/:tagId', cTeamQuery.getPathAndResponses)

export default routes
