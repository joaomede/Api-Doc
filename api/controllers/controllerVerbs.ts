import { knex } from '../db/connection'
import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import resp from 'resp-express'

class Verb {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async store (req: NewRequest, res: Response): Promise<any> {
    const { verbType, endPoint, parameter, verbValue, descriptionVerb, paramsType, respValue, dataType } = req.body
    const { endPointId } = req.params
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
        endPointId: endPointId,
        userIdFk: req.userId
      })
      resp.returnSucessMessage(res, 'Verbo criado com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar criar o verbo')
    }
  }
}

export default new Verb()
