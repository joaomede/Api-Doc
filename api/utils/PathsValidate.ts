import * as Joi from '@hapi/joi'
import { Request, Response, NextFunction } from 'express'
import resp from 'resp-express'

function verbSchema (): Joi.ObjectSchema<object> {
  return Joi.object().keys({
    methodType: Joi.string().required(),
    path: Joi.string().required(),
    descriptionVerb: Joi.string().required(),
    parameter1: Joi.boolean().required(),
    parameter2: Joi.boolean().required(),
    parameter3: Joi.boolean().required(),
    headers: Joi.boolean().required(),
    body: Joi.boolean().required(),
    data: Joi.boolean().required()
  })
}

class VerbValidade {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async create (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      await verbSchema().validateAsync(await req.body)
      next()
    } catch (error) {
      resp.returnErrorMessage(res, `O campo ${error.details[0].path[0]} é requerido`)
    }
  }
}

export default new VerbValidade()
