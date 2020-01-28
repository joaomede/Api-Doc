import { knex } from '../db/connection'
import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import resp from 'resp-express'
import knexPopulate from 'knex-populate'
import query from '../query'

class Api {
  public async store (req: NewRequest, res: Response): Promise<void> {
    try {
      await query.api.createNewApiDoc(req.body, req.userId)
      resp.returnSucessMessage(res, 'Api adicionada com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  public async update (req: NewRequest, res: Response): Promise<void> {
    const id = req.params.id
    try {
      await query.api.updateApi(id, req.body, req.userId)
      resp.returnSucessMessage(res, 'Api atualizada com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  public async index (req: NewRequest, res: Response): Promise<void> {
    try {
      const allApiByUser = await query.api.getAllApiByUser(req.userId)
      resp.returnSucessObject(res, allApiByUser)
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  public async indexPrivate (req: NewRequest, res: Response): Promise<void> {
    try {
      const allApiByUser = await query.api.getAllApiByUserAndVisibility(req.userId, false)
      resp.returnSucessObject(res, allApiByUser)
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  public async indexOne (req: NewRequest, res: Response): Promise<void> {
    const { apiId } = req.params
    try {
      const api = await query.api.getOneApi(apiId, req.userId)
      resp.returnSucessObject(res, api)
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  public async destroy (req: NewRequest, res: Response): Promise<void> {
    const { id } = req.params

    if (id === undefined || id === null) {
      resp.returnErrorMessage(res, 'Não foi identificado a referência da Api')
    }

    try {
      await query.api.deleteApi(id, req.userId)
      resp.returnSucessMessage(res, 'Documentação deletada com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

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
        if (api[0].userIdFk === req.userId) {
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
      const verbAndCodes = await query.api.getPathAndResponsesQuery(endPointId)

      if (verbAndCodes.length === 0) {
        resp.returnErrorMessage(res, 'Não há verbos disponíveis')
      } else {
        if (verbAndCodes[0].userIdFk === req.userId) {
          resp.returnSucessObject(res, verbAndCodes)
        } else {
          resp.returnErrorMessage(res, 'Você não tem autorização para acessar essa documentação')
        }
      }
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }
}

export default new Api()
