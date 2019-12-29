import { knex } from '../db/connection'
import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import resp from 'resp-express'

class Verb {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async store (req: NewRequest, res: Response): Promise<any> {
    const {
      verbType,
      path,
      descriptionVerb,
      parameter1,
      parameterName1,
      parameterValue1,
      parameter2,
      parameterName2,
      parameterValue2,
      parameter3,
      parameterName3,
      parameterValue3,
      headersValue,
      body,
      bodyValue,
      data,
      dataType,
      dataValue
    } = req.body
    const { endPointId } = req.params

    if (endPointId === undefined || endPointId === null) {
      resp.returnErrorMessage(res, 'Não foi identificado o path referência')
    }
    try {
      const result = await knex('paths').insert({
        verbType: verbType,
        descriptionVerb: descriptionVerb,
        path: path,
        parameter1: parameter1,
        parameterName1: parameterName1,
        parameterValue1: parameterValue1,
        parameter2: parameter2,
        parameterName2: parameterName2,
        parameterValue2: parameterValue2,
        parameter3: parameter3,
        parameterName3: parameterName3,
        parameterValue3: parameterValue3,
        headersValue: headersValue,
        body: body,
        bodyValue: bodyValue,
        data: data,
        dataType: dataType,
        dataValue: dataValue,
        tagsIdFk: endPointId,
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
      resp.returnErrorMessage(res, 'Não foi identificado o path relacionado')
    }

    try {
      const path = await knex('paths').where({ userIdFk: req.userId, tagsIdFk: endPointId })
      resp.returnSucessObject(res, path)
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar carregar todos os EndPoints')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async update (req: NewRequest, res: Response): Promise<any> {
    const { id } = req.params

    const newVerb = {
      verbType: req.body.verbType,
      descriptionVerb: req.body.descriptionVerb,
      path: req.body.path,
      parameter1: req.body.parameter1,
      parameterName1: req.body.parameterName1,
      parameterValue1: req.body.parameterValue1,
      parameter2: req.body.parameter2,
      parameterName2: req.body.parameterName2,
      parameterValue2: req.body.parameterValue2,
      parameter3: req.body.parameter3,
      parameterName3: req.body.parameterName3,
      parameterValue3: req.body.parameterValue3,
      headersValue: req.body.headersValue,
      body: req.body.body,
      bodyValue: req.body.bodyValue,
      data: req.body.data,
      dataType: req.body.dataType,
      dataValue: req.body.dataValue
    }

    try {
      await knex('paths').where({ id: id, userIdFk: req.userId }).update(newVerb)
      resp.returnSucessMessage(res, 'O verbo foi atualizado com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar atualizar o paths')
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
      await knex('paths').where({ id: id, userIdFk: req.userId }).del()
      resp.returnSucessMessage(res, 'Verbo apagado com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar apagar verbo')
    }
  }
}

export default new Verb()
