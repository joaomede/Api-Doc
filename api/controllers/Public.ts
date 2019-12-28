import { knex } from '../db/connection'
import { NewRequest } from '../interface/NewRequest'
import resp from 'resp-express'
import { Response } from 'express'
import knexPopulate from 'knex-populate'

class Geral {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getApiAndEndPoints (req: NewRequest, res: Response): Promise<any> {
    const { id } = req.params

    try {
      // const doc = await knex('api').where({ id: id })

      const api = await knex('api').where({ id: id })
      const tags = await knex('tags').where({ apiIdFk: id })
      api[0].tags = tags

      if (api.length === 0) {
        resp.returnErrorMessage(res, 'A api que você está tentando acessar não foi encontrada')
      } else {
        if (api[0].isPublic === 1 || api[0].isPublic === true) {
          resp.returnSucessObject(res, api[0])
        } else {
          resp.returnErrorMessage(res, 'Você não tem autorização para acessar essa documentação')
        }
      }
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar carregar a documentação')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getVerbsAndCodes (req: NewRequest, res: Response): Promise<any> {
    const { endPointId } = req.params

    try {
      const verbAndCodes = await knexPopulate(knex, 'paths')
        .find({ tagsIdFk: endPointId })
        .populate('responses', 'pathsIdFk', 'responses')
        .exec()

      if (verbAndCodes.length === 0) {
        resp.returnErrorMessage(res, 'Não há verbos disponíveis')
      } else {
        resp.returnSucessObject(res, verbAndCodes)
      }
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar expandir')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async listAllPublicApi (req: NewRequest, res: Response): Promise<any> {
    try {
      const allPublicList = await knex('api').select().where({ isPublic: true })
      resp.returnSucessObject(res, allPublicList)
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar listar documentação')
    }
  }
}

export default new Geral()
