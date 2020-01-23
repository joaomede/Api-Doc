import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { Response, NextFunction } from 'express'
import { NewRequest } from '../interface/NewRequest'
import resp from 'resp-express'
dotenv.config()

const secret = process.env.SECRET || ''

class CheckJwt {
  public checkJwt (req: NewRequest, res: Response, next: NextFunction):void | Response {
    const authHeader = req.headers.authorization
    let jwtPayload
    if (authHeader === undefined || authHeader === null) {
      resp.returnErrorCode(res, 401, 'No token provided')
    } else {
      // Bearer klasjdasodajs5fd4s6
      const parts: Array<string> = authHeader.split(' ')
      if (parts.length !== 2) {
        resp.returnErrorCode(res, 401, 'Token error')
      }

      const [scheme, token] = parts

      if (!/^Bearer$/i.test(scheme)) {
        resp.returnErrorCode(res, 401, 'Token malformatted')
      }

      try {
        jwtPayload = jwt.verify(token, secret)
        req.userId = jwtPayload.id
        return next()
      } catch (error) {
        resp.returnErrorCode(res, 401, 'Token invalid')
      }
    }
  }
}

export default new CheckJwt()
