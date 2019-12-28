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
      const result = await knex('verb').insert({
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
      }).returning('*')
      resp.returnSucessObject(res, result)
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async update (req: NewRequest, res: Response): Promise<any> {
    const { id } = req.params

    const newVerb = {
      verbType: req.body.verbType,
      endPoint: req.body.endPoint,
      parameter: req.body.parameter,
      verbValue: req.body.verbValue,
      descriptionVerb: req.body.descriptionVerb,
      paramsType: req.body.paramsType,
      respValue: req.body.respValue,
      dataType: req.body.dataType
    }

    try {
      await knex('verb').where({ id: id, userIdFk: req.userId }).update(newVerb)
      resp.returnSucessMessage(res, 'O verbo foi atualizado com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar atualizar o verb')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async destroy (req: NewRequest, res: Response): Promise<any> {
    const { id } = req.params

    if (id === undefined || id === null) {
      resp.returnErrorMessage(res, 'Não foi identificado a referência do Verbo')
    }
    // precisa remover em cascata
    try {
      await knex('api').where({ id: id, userIdFk: req.userId }).del()
      resp.returnSucessMessage(res, 'Verbo apagado com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar apagar verbo')
    }
  }
}

export default new Verb()
