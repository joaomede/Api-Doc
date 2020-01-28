import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import { knex } from '../db/connection'
import resp from 'resp-express'

class EndPoint {
  public async store (req: NewRequest, res: Response): Promise<any> {
    const { apiId } = req.params

    if (apiId === undefined || apiId === null) {
      resp.returnErrorMessage(res, 'Referência da Api não identificada')
    } else {
      const newEndPoint = {
        nameTag: req.body.nameTag,
        descriptionTag: req.body.descriptionTag,
        apiIdFk: apiId,
        userIdFk: req.userId
      }

      try {
        const result = await knex('tags').insert(newEndPoint).returning('*')
        resp.returnSucessObject(res, result)
      } catch (error) {
        resp.returnErrorMessage(res, 'Erro ao tentar criar EndPoint')
      }
    }
  }

  public async update (req: NewRequest, res: Response): Promise<any> {
    const id = req.params.id

    if (id === undefined || id === null) {
      resp.returnErrorMessage(res, 'O tags a ser atualizado não foi referênciado')
    }

    const newEndpoint = {
      nameTag: req.body.nameTag,
      descriptionTag: req.body.descriptionTag
    }
    try {
      await knex('tags').where({ id: id, userIdFk: req.userId }).update(newEndpoint)
      resp.returnSucessMessage(res, 'Api atualizada com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar atualizar as informações do tags')
    }
  }

  public async index (req: NewRequest, res: Response): Promise<any> {
    const { apiId } = req.params

    try {
      const tags = await knex('tags').where({ userIdFk: req.userId, apiIdFk: apiId })
      resp.returnSucessObject(res, tags)
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar carregar todos os EndPoints')
    }
  }

  public async destroy (req: NewRequest, res: Response): Promise<any> {
    const { id } = req.params

    if (id === undefined || id === null) {
      resp.returnErrorMessage(res, 'Referencia para o tags não foi encontrada')
    }

    try {
      const tags = await knex('tags').where({ userIdFk: req.userId, id: id })
      if (tags.length === 0) {
        resp.returnErrorMessage(res, 'Esse tags já foi removido ou não existe')
      } else {
        await knex('tags').where({ userIdFk: req.userId, id: id }).del()
        resp.returnSucessMessage(res, 'Endpoint removido com sucesso')
      }
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar remover tags')
    }
  }
}

export default new EndPoint()
