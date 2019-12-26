import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { Response, NextFunction } from 'express'
import { NewRequest } from '../interface/NewRequest'
dotenv.config()

const secret = process.env.SECRET || ''

class CheckJwt {
  public checkJwt (req: NewRequest, res: Response, next: NextFunction):void | Response {
    const authHeader = req.headers.authorization
    let jwtPayload
    if (!authHeader) {
      return res.status(401).send({ error: 'No token provided' })
    }

    // Bearer klasjdasodajs5fd4s6
    const parts: Array<string> = authHeader.split(' ')
    if (parts.length !== 2) {
      return res.status(401).send({ error: 'Token error' })
    }

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).send({ error: 'Token malformatted' })
    }

    try {
      jwtPayload = jwt.verify(token, secret)
    } catch (error) {
      return res.status(401).send({ error: 'Token invalid' })
    }
    req.userId = jwtPayload.id
    return next()
  }
}

export default new CheckJwt()
