import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import { knex } from '../db/connection'
import resp from 'resp-express'

class EndPoint {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async store (req: NewRequest, res: Response): Promise<any> {
    const { apiId } = req.params

    if (apiId === undefined || apiId === null) {
      resp.returnErrorMessage(res, 'Referência da Api não identificada')
    } else {
      const newEndPoint = {
        nameEndPointsType: req.body.nameEndPointsType,
        descriptionEndPonitsType: req.body.descriptionEndPonitsType,
        apiIdFk: apiId,
        userIdFk: req.userId
      }

      try {
        await knex('endpoint').insert(newEndPoint)
        resp.returnSucessMessage(res, 'Novo EndPoint criado com sucesso')
      } catch (error) {
        resp.returnErrorMessage(res, 'Erro ao tentar criar EndPoint')
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async update (req: NewRequest, res: Response): Promise<any> {
    const id = req.params.id

    if (id === undefined || id === null) {
      resp.returnErrorMessage(res, 'O endpoint a ser atualizado não foi referênciado')
    }

    const newEndpoint = {
      nameEndPointsType: req.body.nameEndPointsType,
      descriptionEndPonitsType: req.body.descriptionEndPonitsType
    }
    try {
      await knex('endpoint').where({ id: id, userIdFk: req.userId }).update(newEndpoint)
      resp.returnSucessMessage(res, 'Api atualizada com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar atualizar as informações do endpoint')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async index (req: NewRequest, res: Response): Promise<any> {
    const { apiId } = req.params

    try {
      const endpoint = await knex('endpoint').where({ userIdFk: req.userId, apiIdFk: apiId })
      resp.returnSucessObject(res, endpoint)
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar carregar todos os EndPoints')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async destroy (req: NewRequest, res: Response): Promise<any> {
    const { id } = req.params

    if (id === undefined || id === null) {
      resp.returnErrorMessage(res, 'Referencia para o endpoint não foi encontrada')
    }

    try {
      const endpoint = await knex('endpoint').where({ userIdFk: req.userId, id: id })
      if (endpoint.length === 0) {
        resp.returnErrorMessage(res, 'Esse endpoint já foi removido ou não existe')
      } else {
        await knex('endpoint').where({ userIdFk: req.userId, id: id }).del()
        resp.returnSucessMessage(res, 'Endpoint removido com sucesso')
      }
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar remover endpoint')
    }
  }
}

export default new EndPoint()
