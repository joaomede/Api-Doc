import * as Joi from '@hapi/joi'
import { Request, Response, NextFunction } from 'express'
import resp from 'resp-express'

function loginSchema (): Joi.ObjectSchema<object> {
  return Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required()
  })
}

function registerSchema (): Joi.ObjectSchema<object> {
  return Joi.object().keys({
    name: Joi.string()
      .max(30)
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    email: Joi.string()
      .email()
      .required()
  })
}

class Validation {
  public async register (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await registerSchema().validateAsync(await req.body)
      next()
    } catch (error) {
      resp.returnErrorMessage(res, `O campo ${error.details[0].path[0]} é requerido`)
    }
  }

  public async login (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await loginSchema().validateAsync(await req.body)
      next()
    } catch (error) {
      resp.returnErrorMessage(res, `O campo ${error.details[0].path[0]} é requerido`)
    }
  }
}

export default new Validation()
