import * as Joi from '@hapi/joi'
import { Request, Response, NextFunction } from 'express'
import resp from 'resp-express'

function ResponsesSchema (): Joi.ObjectSchema<object> {
  return Joi.object().keys({
    typeCode: Joi.string().required(),
    reason: Joi.string().required(),
    responseModel: Joi.string().required(),
    headers: Joi.string().required()
  })
}

class ApiValidade {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async create (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      await ResponsesSchema().validateAsync(await req.body)
      next()
    } catch (error) {
      resp.returnErrorMessage(res, `O campo ${error.details[0].path[0]} é requerido`)
    }
  }
}

export default new ApiValidade()
