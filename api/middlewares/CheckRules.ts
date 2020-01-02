import { Response, NextFunction } from 'express'
import { NewRequest } from '../interface/NewRequest'
import { knex } from '../db/connection'
import resp from 'resp-express'

class CheckRules {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async checkRules (req: NewRequest, res: Response, next: NextFunction):Promise<any> {
    const rules = await knex('team_rules').where({
      teamIdFk: req.body.teamIdFk,
      userIdFk: req.userId
    })

    if (rules.length === 0) {
      resp.returnErrorMessage(res, 'Você não tem autorização para isso')
    } else {
      if (rules[0].userIdFk === req.userId) {
        req.teamIdFk = req.body.teamIdFk
        return next()
      } else {
        resp.returnErrorMessage(res, 'Você não tem autorização para isso')
      }
    }
  }
}

export default new CheckRules()
