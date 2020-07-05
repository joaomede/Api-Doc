import apiDoc from '../config/api'
import { Response, Request } from 'express'
import resp from 'resp-express'
import { NewRequest } from '../interface/newRequest'

class Auth {
  public async register (req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body
    try {
      const user = await apiDoc.userRegister(name, email, password)
      resp.returnSucessObject(res, user)
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao verificar disponibilidade do e-mail')
    }
  }

  public async auth (req: Request, res: Response): Promise<void> {
    const { email, password } = req.body

    try {
      const user = await apiDoc.userAuth(email, password)
      resp.returnSucessObject(res, user)
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  public async changePassword (req: NewRequest, res: Response): Promise<void> {
    // const { passwordOne, passwordTwo } = req.body
    // const authHeader = req.headers.authorization

    // async function changePass (decoded): Promise<void> {
    //   try {
    //     const password = await bcrypt.hash(passwordOne, 10)
    //     await knex('users').where({ id: decoded.id }).update({ password: password })
    //     resp.returnSucessMessage(res, 'Senha alterada com sucesso')
    //   } catch (error) {
    //     resp.returnErrorMessage(res, 'Erro ao tentar alterar a senha')
    //   }
    // }

    // if (authHeader === undefined || authHeader === null) {
    //   resp.returnErrorMessage(res, 'Você preecisa estar logado para fazer isso')
    // }

    // if (passwordOne !== passwordTwo) {
    //   resp.returnErrorMessage(res, 'As senhas não são iguais')
    // } else {
    //   const parts = authHeader.split(' ')
    //   if (parts.length !== 2) {
    //     resp.returnErrorCode(res, 401, 'Token error')
    //   }
    //   const [scheme, token] = parts
    //   if (!/^Bearer$/i.test(scheme)) {
    //     resp.returnErrorCode(res, 401, 'Token mal formado')
    //   }
    //   jwt.verify(token, env.secret, (err, decoded) => {
    //     if (err) {
    //       resp.returnErrorCode(res, 403, 'Token invalido')
    //     }
    //     changePass(decoded)
    //   })
    // }
  }
}

export default new Auth()
