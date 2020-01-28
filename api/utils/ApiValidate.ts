import * as Joi from '@hapi/joi'
import { Request, Response, NextFunction } from 'express'
import resp from 'resp-express'

function apiSchema (): Joi.ObjectSchema<object> {
  return Joi.object().keys({
    apiName: Joi.string().required(),
    descriptionApi: Joi.string().required(),
    version: Joi.string().required(),
    email: Joi.string().required(),
    license: Joi.string().required(),
    isPublic: Joi.boolean().required(),
    baseURL: Joi.string().required()
  })
}

class ApiValidade {
  public async create (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await apiSchema().validateAsync(await req.body)
      next()
    } catch (error) {
      resp.returnErrorMessage(res, `O campo ${error.details[0].path[0]} é requerido`)
    }
  }
}

export default new ApiValidade()
