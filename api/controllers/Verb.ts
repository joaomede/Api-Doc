import { knex } from '../db/connection'
import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import resp from 'resp-express'

class Verb {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async store (req: NewRequest, res: Response): Promise<any> {
    const { verbType, endPoint, parameter, verbValue, descriptionVerb, paramsType, respValue, dataType } = req.body
    const { endPointId } = req.params

    if (endPointId === undefined || endPointId === null) {
      resp.returnErrorMessage(res, 'Não foi identificado o endpoint referência')
    }
    try {
      await knex('verb').insert({
        verbType: verbType,
        endPoint: endPoint,
        parameter: parameter,
        verbValue: verbValue,
        descriptionVerb: descriptionVerb,
        paramsType: paramsType,
        respValue: respValue,
        dataType: dataType,
        endPointIdFk: endPointId,
        userIdFk: req.userId
      })
      resp.returnSucessMessage(res, 'Verbo criado com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, error)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async index (req: NewRequest, res: Response): Promise<any> {
    const { endPointId } = req.params

    if (endPointId === undefined || endPointId === null) {
      resp.returnErrorMessage(res, 'Não foi identificado o endpoint relacionado')
    }

    try {
      const endpoint = await knex('verb').where({ userIdFk: req.userId, endPointIdFk: endPointId })
      resp.returnSucessObject(res, endpoint)
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar carregar todos os EndPoints')
    }
  }
}

export default new Verb()
