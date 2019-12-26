import { knex } from '../db/connection'
import { Response, Request } from 'express'
import Plugin from '../plugin/Plugin'
import resp from 'resp-express'
import { NewRequest } from '../interface/NewRequest'
import bcrypt = require('bcrypt')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function verificaSuper (req: NewRequest, res: Response): Promise<any> {
  const user = await User.findById({ _id: req.userId })

  if (user == null) {
    return res.status(400).json({ error: 'O usuário não existe' })
  }

  if ((user.funcao != 'Super') | (user.funcao == null)) {
    return res.status(400).json({ error: 'Você não tem permissão para criar grupos' })
  }
}

class Auth {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async register (req: Request, res: Response): Promise<any> {
    const { email, password } = req.body
    try {
      const result = await knex('user').select().where('email', email)
      if (result.length === 0) {
        const saltRounds = 10
        const hash = bcrypt.hashSync(password, saltRounds)
        req.body.password = hash

        try {
          const user = await knex('user').insert(req.body).returning('*')
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
      const user = await knex('user').where({ email: email })
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async forgotPassword (req: Request, res: Response): Promise<any> {
    const { email } = req.body

    try {
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).send({ error: 'Usuário não encontrado' })
      }

      const token = crypto.randomBytes(20).toString('hex')

      const now = new Date()
      now.setHours(now.getHours() + 1)

      await User.findByIdAndUpdate(user._id, {
        $set: {
          passwordResetToken: token,
          passwordResetExpires: now
        }
      })

      await mailer.sendMail(
        {
          to: email,
          from: 'symbol2studio@gmail.com',
          template: 'auth/forgot_password',
          context: { token }
        },
        err => {
          if (err) {
            return res.status(400).send({ error: 'Não foi possível enviar o email' + err })
          }

          return res.status(200).send({ ok: 'Email enviado com sucesso' })
        }
      )
    } catch (err) {
      res.status(400).send({ error: 'Erro ao recuperar a senha, tente de novo' + err })
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async resetPassword (req: Request, res: Response): Promise<any> {
    const { email, token, password } = req.body

    try {
      const user = await User.findOne({ email }).select('+passwordResetToken passwordResetExpires')

      if (!user) return res.status(400).send({ error: 'Usuário inexistente' })

      if (token !== user.passwordResetToken) return res.status(400).send({ error: 'Token invalido' })

      const now = new Date()

      if (now > user.passwordResetExpires) return res.status(400).send({ error: 'Token expirado, solicite uma nova recuperação' })

      user.password = password

      await user.save()

      res.send()
    } catch (err) {
      res.status(400).send({ error: 'Não foi possível resetar a senha, tente de novo' })
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async alterarSenha (req: Request, res: Response): Promise<any> {
    const { password1, password2 } = req.body

    if (!password1 | (password1 == '')) {
      return res.status(400).send({ error: 'Campo de senha 1 está inválido ou em branco' })
    }
    if (!password2 | (password2 == '')) {
      return res.status(400).send({ error: 'Campo de senha 2 está inválido ou em branco' })
    }
    if (password1 != password2) {
      return res.status(400).send({ error: 'As duas senhas precisam ser iguais' })
    }

    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).send({ error: 'Não há token' })
    }

    // Bearer klasjdasodajs5fd4s6
    const parts = authHeader.split(' ')
    if (!parts.lenght === 2) {
      return res.status(401).send({ error: 'Token error' })
    }

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).send({ error: 'Token mal formado' })
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) {
        return res.status(403).send({ error: 'Token invalido' })
      }
      trocaDeSenha()
      async function trocaDeSenha () {
        const password = await bcrypt.hash(password1, 10)
        await User.findByIdAndUpdate({ _id: decoded.id }, { password: password })
        return res.status(200).send({ ok: 'Senha alterada com sucesso' })
      }
    })
  }

  // método de Dev, desativar depois
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async atualizaFuncao (req: Request, res: Response): Promise<any> {
    const { id, funcao } = req.body
    if (!id | (id == '')) {
      return res.status(400).send({ error: 'Usuario não definido' })
    }
    if (!funcao | (funcao == '')) {
      return res.status(400).send({ error: 'Função para usuário não definida' })
    }

    const user = await User.findById({ _id: id })
    if (!user | user == '') {
      return res.status(400).send({ error: 'O usuário referência não existe' })
    }

    await User.updateOne(user, { funcao: funcao })
      .then(() => {
        return res.status(200).send({ ok: 'Usuário atualizado com sucesso' })
      })
      .catch(err => {
        return res.status(400).send({ error: 'Atualização falhou: ' + err })
      })
  }

  // Requer Super
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async apagarUser (req: Request, res: Response): Promise<any> {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided' })
    }

    // Bearer klasjdasodajs5fd4s6
    const parts = authHeader.split(' ')
    if (!parts.lenght === 2) {
      return res.status(401).json({ error: 'Token error' })
    }

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ error: 'Token malformatted' })
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token invalid' })
      }
      req.userId = decoded.id
    })

    const user = await User.findById({ _id: req.userId }).catch(() => {
      return res.status(400).json({ error: 'Usuário logado não encontrado' })
    })

    if (user == null) {
      return res.status(400).json({ error: 'O token logado não pertence a nenhum Super' })
    }

    const { refId } = req.params

    if (!refId | (refId == '')) {
      return res.status(400).send({ error: 'Usuario não definido' })
    }

    const usuario = await User.findById({ _id: refId }).catch(() => {
      return res.status(400).send({ error: 'Usuario a ser apagado não existe' })
    })

    User.deleteOne(usuario).then(() => {
      return res.status(200).send({ ok: 'Usuário removido com sucesso' })
    }).catch(() => {
      return res.status(400).send({ error: 'Não foi possível remover o usuário' })
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async listaUsuarios (req: Request, res: Response): Promise<any> {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided' })
    }

    // Bearer klasjdasodajs5fd4s6
    const parts = authHeader.split(' ')
    if (!parts.lenght === 2) {
      return res.status(401).json({ error: 'Token error' })
    }

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ error: 'Token malformatted' })
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token invalid' })
      }
      req.userId = decoded.id
    })

    const user = await User.findById({ _id: req.userId })

    if (user == null) {
      return res.status(400).json({ error: 'O token logado não pertence a nenhum Super' })
    }

    if ((user.funcao != 'Super')) {
      return res.status(400).json({ error: 'Você não tem permissão para listar contratos' })
    }

    await User.find({})
      .then(result => {
        return res.status(200).json(result)
      })
      .catch(err => {
        return res.status(400).json(err)
      })
  }
}

export default new Auth()
