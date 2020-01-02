
import { knex } from '../db/connection'
import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import resp from 'resp-express'
import knexPopulate from 'knex-populate'

class ApiTeam {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getApiAndEndPoints (req: NewRequest, res: Response): Promise<any> {
    const { id } = req.params

    try {
      const api = await knex('api').where({ id: id })
      const tags = await knex('tags').where({ apiIdFk: id })
      api[0].tags = tags

      if (api.length === 0) {
        resp.returnErrorMessage(res, 'A api que você está tentando acessar não foi encontrada')
      } else {
        resp.returnSucessObject(res, api[0])
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
  public async apiList (req: NewRequest, res: Response): Promise<any> {
    // const { sortValue, campo } = req.params

    // esse metodo precisa fazer o SORT
    try {
      const allApiByUser = await knex('api').select().where({ userIdFk: req.userId })
      resp.returnSucessObject(res, allApiByUser)
    } catch (error) {
      resp.returnErrorMessage(res, "Erro ao carregar a lista de Api's")
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async pathIndex (req: NewRequest, res: Response): Promise<any> {
    const { endPointId } = req.params

    if (endPointId === undefined || endPointId === null) {
      resp.returnErrorMessage(res, 'Não foi identificado o path relacionado')
    }

    try {
      const path = await knex('paths').where({ tagsIdFk: endPointId })
      resp.returnSucessObject(res, path)
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar carregar todos os EndPoints')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async responseIndex (req: NewRequest, res: Response): Promise<any> {
    const { verbId } = req.params

    if (verbId === undefined || verbId === null) {
      resp.returnErrorMessage(res, 'Verbo Associado não foi referênciado')
    }

    try {
      const tags = await knex('responses').where({ pathsIdFk: verbId })
      resp.returnSucessObject(res, tags)
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar carregar todos os códigos respostas')
    }
  }
}

export default new ApiTeam()
