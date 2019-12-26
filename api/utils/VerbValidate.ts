import * as Joi from '@hapi/joi'
import { Request, Response, NextFunction } from 'express'
import resp from 'resp-express'

function verbSchema (): Joi.ObjectSchema<object> {
  return Joi.object().keys({
    verbType: Joi.string().required(),
    endPoint: Joi.string().required(),
    parameter: Joi.string().required(),
    verbValue: Joi.string().required(),
    descriptionVerb: Joi.string().required(),
    paramsType: Joi.string().required(),
    respValue: Joi.string().required(),
    dataType: Joi.string().required()
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
