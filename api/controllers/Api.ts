import { knex } from '../db/connection'
import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import resp from 'resp-express'
import knexPopulate from 'knex-populate'

class Api {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async store (req: NewRequest, res: Response): Promise<any> {
    try {
      await knex('api').insert({
        apiName: req.body.apiName,
        version: req.body.version,
        isPublic: req.body.isPublic,
        descriptionApi: req.body.descriptionApi,
        userIdFk: req.userId
      })

      resp.returnSucessMessage(res, 'Api adicionada com sucesso')
    } catch (error) {
      // resp.returnErrorMessage(res, 'Erro ao tentar criar api')
      resp.returnErrorMessage(res, error)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async update (req: NewRequest, res: Response): Promise<any> {
    const id = req.params.id

    const newApi = {
      apiName: req.body.apiName,
      version: req.body.version,
      isPublic: req.body.isPublic,
      descriptionApi: req.body.descriptionApi
    }
    try {
      await knex('api').where({ id: id, userIdFk: req.userId }).update(newApi)
      resp.returnSucessMessage(res, 'Api atualizada com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar atualizar as informações da api')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async index (req: NewRequest, res: Response): Promise<any> {
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
  public async indexOne (req: NewRequest, res: Response): Promise<any> {
    const { apiId } = req.params

    /// esse metodo precisa de algo similar a populate

    try {
      const api = await knex('api').select().where({ id: apiId, userIdFk: req.userId })
      resp.returnSucessObject(res, api)
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar carregar as informações da api')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async destroy (req: NewRequest, res: Response): Promise<any> {
    const { id } = req.params

    if (id === undefined || id === null) {
      resp.returnErrorMessage(res, 'Não foi identificado a referência da Api')
    }
    // precisa remover em cascata
    try {
      await knex('api').where({ id: id, userIdFk: req.userId }).del()
      resp.returnSucessMessage(res, 'Documentação deletada com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar deletar documentação')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getApiAndEndPoints (req: NewRequest, res: Response): Promise<any> {
    const { id } = req.params

    try {
      // const doc = await knex('api').where({ id: id })

      const api = await knex('api').where({ id: id })
      const endPoint = await knex('endpoint').where({ apiIdFk: id })
      api[0].endpoint = endPoint

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getVerbsAndCodes (req: NewRequest, res: Response): Promise<any> {
    const { endPointId } = req.params

    try {
      const verbAndCodes = await knexPopulate(knex, 'verb')
        .find({ endPointIdFk: endPointId })
        .populate('codesresp', 'verbIdFk', 'codesresp')
        .exec()

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
      resp.returnErrorMessage(res, 'Erro ao tentar expandir')
    }
  }
}

export default new Api()
