import { knex } from '../db/connection'
import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import resp from 'resp-express'

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
}

export default new Api()
