import * as Joi from '@hapi/joi'
import { Request, Response, NextFunction } from 'express'
import resp from 'resp-express'

function endPointSchema (): Joi.ObjectSchema<object> {
  return Joi.object().keys({
    nameTag: Joi.string().required(),
    descriptionTag: Joi.string().required()
  })
}

class EndPointValidade {
  public async create (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      await endPointSchema().validateAsync(await req.body)
      next()
    } catch (error) {
      resp.returnErrorMessage(res, `O campo ${error.details[0].path[0]} é requerido`)
    }
  }
}

export default new EndPointValidade()
