import { knex } from '../db/connection'
import { Response, Request } from 'express'
import Plugin from '../plugin/Plugin'
import resp from 'resp-express'
import { NewRequest } from '../interface/NewRequest'
import { env } from '../config/env'
import * as jwt from 'jsonwebtoken'
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

  public async changePassword (req: NewRequest, res: Response): Promise<any> {
    const { passwordOne, passwordTwo } = req.body
    const authHeader = req.headers.authorization

    async function changePass (decoded): Promise<any> {
      try {
        const password = await bcrypt.hash(passwordOne, 10)
        await knex('users').where({ id: decoded.id }).update({ password: password })
        resp.returnSucessMessage(res, 'Senha alterada com sucesso')
      } catch (error) {
        resp.returnErrorMessage(res, 'Erro ao tentar alterar a senha')
      }
    }

    if (authHeader === undefined || authHeader === null) {
      resp.returnErrorMessage(res, 'Você preecisa estar logado para fazer isso')
    }

    if (passwordOne !== passwordTwo) {
      resp.returnErrorMessage(res, 'As senhas não são iguais')
    } else {
      const parts = authHeader.split(' ')
      if (parts.length !== 2) {
        resp.returnErrorCode(res, 401, 'Token error')
      }
      const [scheme, token] = parts
      if (!/^Bearer$/i.test(scheme)) {
        resp.returnErrorCode(res, 401, 'Token mal formado')
      }
      jwt.verify(token, env.secret, (err, decoded) => {
        if (err) {
          resp.returnErrorCode(res, 403, 'Token invalido')
        }
        changePass(decoded)
      })
    }
  }
}

export default new Auth()
