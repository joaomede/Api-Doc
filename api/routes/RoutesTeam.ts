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
routes.get('/api/teamdocs/api/getapiandendpoints/:id', cTeamQuery.getApiAndEndPoints)
routes.get('/api/teamdocs/api/getverbsandcodes/:id/:endPointId', cTeamQuery.getVerbsAndCodes)

export default routes
