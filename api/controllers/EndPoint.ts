import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import { knex } from '../db/connection'
import resp from 'resp-express'

class EndPoint {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async store (req: NewRequest, res: Response): Promise<any> {
    const newEndPoint = {
      nameEndPointsType: req.body.nameEndPointsType,
      descriptionEndPonitsType: req.body.descriptionEndPonitsType,
      apiIdFk: req.params.apiId,
      userIdFk: req.userId
    }

    try {
      await knex('endpoint').insert(newEndPoint)
      resp.returnErrorMessage(res, 'Novo EndPoint criado com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar criar EndPoint')
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
    try {
      await knex('endpoint').where({ userIdFk: req.userId, id: id })
      resp.returnSucessMessage(res, 'Endpoint removido com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar remover endpoint')
    }
  }
}

export default new EndPoint()
