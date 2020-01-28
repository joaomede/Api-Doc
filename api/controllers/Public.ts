import { knex } from '../db/connection'
import { NewRequest } from '../interface/NewRequest'
import resp from 'resp-express'
import { Response } from 'express'
import knexPopulate from 'knex-populate'

class Geral {
  public async getApiAndEndPoints (req: NewRequest, res: Response): Promise<void> {
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

  public async getPathAndResponses (req: NewRequest, res: Response): Promise<void> {
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

  public async listAllPublicApi (req: NewRequest, res: Response): Promise<void> {
    try {
      const allPublicList = await knex('api')
        .where({ isPublic: true })
        .join('users', 'users.id', 'api.userIdFk')
        .select('api.id', 'api.descriptionApi', 'api.apiName', 'users.name')

      resp.returnSucessObject(res, allPublicList)
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar listar documentação')
    }
  }
}

export default new Geral()
