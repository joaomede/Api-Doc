import { knex } from '../db/connection'
import { NewRequest } from '../interface/NewRequest'
import resp from 'resp-express'
import { Response } from 'express'
class Geral {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getPublicDoc (req: NewRequest, res: Response): Promise<any> {
    const { id } = req.params

    try {
      const doc = await knex('api').where({ id: id })

      if (doc.length === 0) {
        resp.returnErrorMessage(res, 'A api que você está tentando acessar não existe')
      } else {
        if (doc[0].isPublic === 1 || doc[0].isPublic === true) {
          resp.returnSucessObject(res, doc[0])
        } else {
          resp.returnErrorMessage(res, 'Você não tem autorização para acessar essa documentação')
        }
      }
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar carregar a documentação')
    }
  }
}

export default new Geral()
