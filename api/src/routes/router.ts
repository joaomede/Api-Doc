import { Router } from 'express'
import apiValidate from '../utils/apiValidate'
import tagsValidate from '../utils/tagsValidation'
import validate from '../utils/validation'

import cTeam from '../controllers/team'
import cApi from '../controllers/api'
import cTags from '../controllers/tags'
import cPaths from '../controllers/path'
import cResponses from '../controllers/responses'
import cAuth from '../controllers/auth'
import check from '../controllers/checkin'
import cPublics from '../controllers/public'
import cTeamQuery from '../controllers/teamQuery'
import CheckJwt from '../middlewares/checkJwt'

/**
 * All Team Routers
 *
 * @class TeamRouters
 */
class TeamRouters {
  public routes = Router()

  /**
   *Creates an instance of TeamRouters.
   * @memberof TeamRouters
   */
  constructor () {
    this.apiTeamRouters()
  }

  /**
   * Api Team Routers
   *
   * @private
   * @memberof TeamRouters
   */
  private apiTeamRouters (): void {
    this.routes.get('/api/teamdocs/listall', cTeamQuery.listTeamsIAmMember)
    this.routes.delete('/api/teamdocs/delete/:id', cTeamQuery.exitTeam)
    this.routes.get('/api/teamdocs/api/getapiandtags/:id', cTeamQuery.getApiAndTags)
    this.routes.get('/api/teamdocs/api/getpathsandresponses/:id/:tagId', cTeamQuery.getPathAndResponses)
  }
}

/**
 * All Public Routers
 *
 * @class PublicRouters
 */
class PublicRouters {
  public routes = Router()

  /**
   *Creates an instance of PublicRouters.
   * @memberof PublicRouters
   */
  constructor () {
    this.publicRouters()
  }

  /**
   * Public Routers
   *
   * @private
   * @memberof PublicRouters
   */
  private publicRouters (): void {
    this.routes.get('/api/geral/getapiandtags/:id', cPublics.getApiAndTags)
    this.routes.get('/api/geral/getpathsandresponses/:tagId', cPublics.getPathAndResponses)
    this.routes.get('/api/geral/listallpublicapi', cPublics.listAllPublicApi)
  }
}

/**
 * All Main Routers
 *
 * @class MainRouters
 */
class MainRouters {
  public routes = Router()

  /**
   *Creates an instance of MainRouters.
   * @memberof MainRouters
   */
  constructor () {
    this.routersTeams()
    this.routersAPI()
    this.routersTag()
    this.routersPath()
    this.routersCodeResponses()
  }

  /**
   * Teams Routers
   *
   * @private
   * @memberof MainRouters
   */
  private routersTeams (): void {
    this.routes.post('/api/team/create', cTeam.store)
    this.routes.get('/api/team/getall', cTeam.index)
    // routes.put('/api/team/update/:id', cTeam.update)
    this.routes.delete('/api/team/delete/:id', cTeam.destroy)
    this.routes.post('/api/team/addmember', cTeam.addMember)
    this.routes.delete('/api/team/deletemember/:id', cTeam.removeMember)
    this.routes.get('/api/team/listallmembers/:teamIdFk', cTeam.listAllMembers)
  }

  /**
   * PI Router
   *
   * @private
   * @memberof MainRouters
   */
  private routersAPI (): void {
    this.routes.post('/api/api/create', apiValidate.create, cApi.store)
    // routes.get('/api/api/get/:apiId', cApi.indexOne)
    this.routes.get('/api/api/getall', cApi.index)
    this.routes.get('/api/api/getallprivate', cApi.indexPrivate)
    this.routes.delete('/api/api/delete/:id', cApi.destroy)
    this.routes.put('/api/api/update/:id', cApi.update)
    // API populate
    this.routes.get('/api/api/getapiandtags/:id', cApi.getApiAndTags)
    this.routes.get('/api/api/getpathsandresponses/:tagId', cApi.getPathAndResponses)
  }

  /**
   * Tag Routers
   *
   * @private
   * @memberof MainRouters
   */
  private routersTag (): void {
    this.routes.post('/api/tags/create/:apiId', tagsValidate.create, cTags.store)
    // routes.get('/api/tags/getall/:apiId', cTags.index)
    this.routes.delete('/api/tags/delete/:id', cTags.destroy)
    this.routes.put('/api/tags/update/:id', cTags.update)
  }

  /**
   * Path Routers
   *
   * @private
   * @memberof MainRouters
   */
  private routersPath (): void {
    this.routes.post('/api/paths/create/:tagId', cPaths.store)
    // routes.get('/api/paths/getall/:tagId', cPaths.index)
    this.routes.delete('/api/paths/delete/:id', cPaths.destroy)
    this.routes.put('/api/paths/update/:id', cPaths.update)
  }

  /**
   * Code Reponse Routers
   *
   * @private
   * @memberof MainRouters
   */
  private routersCodeResponses (): void {
    this.routes.post('/api/responses/create/:pathId', cResponses.store)
    // routes.get('/api/responses/getall/:pathId', cResponses.index)
    this.routes.delete('/api/responses/delete/:id', cResponses.destroy)
    this.routes.put('/api/responses/update/:id', cResponses.update)
  }
}

/**
 * All Auth Routers
 *
 * @class AuthRouters
 */
class AuthRouters {
  public routes = Router()

  /**
   *Creates an instance of AuthRouters.
   * @memberof AuthRouters
   */
  constructor () {
    this.checkinRouter()
    this.routersAuth()
  }

  /**
   * Auth Routers
   *
   * @private
   * @memberof TeamRouters
   */
  private routersAuth (): void {
    this.routes.post('/api/auth/login', validate.login, cAuth.auth)
    this.routes.post('/api/auth/register', validate.register, cAuth.register)
    this.routes.put('/api/auth/changepassword', cAuth.changePassword)
  }

  /**
   * Check JWT Router
   *
   * @private
   * @memberof CheckinRouters
   */
  private checkinRouter (): void {
    this.routes.get('/api/auth/checkin', CheckJwt.checkJwt, check.checkin)
  }
}

export {
  TeamRouters,
  PublicRouters,
  MainRouters,
  AuthRouters
}
