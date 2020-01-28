import { knex } from '../db/connection'
import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import resp from 'resp-express'
import knexPopulate from 'knex-populate'

class Api {
  public async store (req: NewRequest, res: Response): Promise<void> {
    try {
      await knex('api').insert({
        apiName: req.body.apiName,
        version: req.body.version,
        descriptionApi: req.body.descriptionApi,
        email: req.body.email,
        license: req.body.license,
        isPublic: req.body.isPublic,
        baseURL: req.body.baseURL,
        userIdFk: req.userId
      })

      resp.returnSucessMessage(res, 'Api adicionada com sucesso')
    } catch (error) {
      // resp.returnErrorMessage(res, 'Erro ao tentar criar api')
      resp.returnErrorMessage(res, error)
    }
  }

  public async update (req: NewRequest, res: Response): Promise<void> {
    const id = req.params.id

    const newApi = {
      apiName: req.body.apiName,
      version: req.body.version,
      email: req.body.email,
      license: req.body.license,
      isPublic: req.body.isPublic,
      baseURL: req.body.baseURL,
      descriptionApi: req.body.descriptionApi
    }
    try {
      await knex('api').where({ id: id, userIdFk: req.userId }).update(newApi)
      resp.returnSucessMessage(res, 'Api atualizada com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar atualizar as informações da api')
    }
  }

  public async index (req: NewRequest, res: Response): Promise<void> {
    // const { sortValue, campo } = req.params

    // esse metodo precisa fazer o SORT
    try {
      const allApiByUser = await knex('api').select().where({ userIdFk: req.userId })
      resp.returnSucessObject(res, allApiByUser)
    } catch (error) {
      resp.returnErrorMessage(res, "Erro ao carregar a lista de Api's")
    }
  }

  public async indexPrivate (req: NewRequest, res: Response): Promise<void> {
    // const { sortValue, campo } = req.params

    // esse metodo precisa fazer o SORT
    try {
      const allApiByUser = await knex('api').select().where({ userIdFk: req.userId, isPublic: false })
      resp.returnSucessObject(res, allApiByUser)
    } catch (error) {
      resp.returnErrorMessage(res, "Erro ao carregar a lista de Api's privadas")
    }
  }

  public async indexOne (req: NewRequest, res: Response): Promise<void> {
    const { apiId } = req.params

    /// esse metodo precisa de algo similar a populate

    try {
      const api = await knex('api').select().where({ id: apiId, userIdFk: req.userId })
      resp.returnSucessObject(res, api)
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar carregar as informações da api')
    }
  }

  public async destroy (req: NewRequest, res: Response): Promise<void> {
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

  public async getVerbsAndCodes (req: NewRequest, res: Response): Promise<void> {
    const { endPointId } = req.params

    try {
      const verbAndCodes = await knexPopulate(knex, 'paths')
        .find({ tagsIdFk: endPointId })
        .populate('responses', 'pathsIdFk', 'responses')
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
