import { knex } from '../db/connection'
import { Response, Request } from 'express'
import Plugin from '../plugin/Plugin'
import resp from 'resp-express'
import bcrypt = require('bcrypt')

class Auth {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async register (req: Request, res: Response): Promise<any> {
    const { email, password } = req.body
    try {
      const result = await knex('users').select().where('email', email)
      if (result.length === 0) {
        const saltRounds = 10
        const hash = bcrypt.hashSync(password, saltRounds)
        req.body.password = hash

        try {
          const user = await knex('users').insert(req.body).returning('*')
          resp.returnSucessObject(res, user)
        } catch (error) {
          resp.returnErrorMessage(res, 'Erro ao tentar cadastrar o novo usuário')
        }
      } else {
        resp.returnErrorMessage(res, 'O email já existe')
      }
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao verificar disponibilidade do e-mail')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async auth (req: Request, res: Response): Promise<any> {
    const { email, password } = req.body

    try {
      const user = await knex('users').where({ email: email })
      if (user.length === 0) {
        resp.returnErrorMessage(res, 'O usuário não foi encontrado')
      } else {
        const match = bcrypt.compareSync(password, user[0].password)
        if (match) {
          user[0].password = undefined
          resp.returnSucessObject(res, {
            user: user[0],
            token: await Plugin.generateToken({ id: user[0].id }, '7d')
          })
        } else {
          resp.returnErrorMessage(res, 'A senhão está incorreta')
        }
      }
    } catch (error) {
      resp.returnErrorMessage(res, 'Problemas ao tentar efetuar o login')
    }
  }
}

export default new Auth()
