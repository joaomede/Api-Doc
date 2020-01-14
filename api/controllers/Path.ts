import { knex } from '../db/connection'
import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import resp from 'resp-express'

class Path {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async store (req: NewRequest, res: Response): Promise<any> {
    const {
      methodType,
      pathName,
      path,
      descriptionVerb,
      parameter,
      headersValue,
      bodyValue,
      data
    } = req.body
    const { endPointId } = req.params

    if (endPointId === undefined || endPointId === null) {
      resp.returnErrorMessage(res, 'Não foi identificado o path referência')
    }
    try {
      const result = await knex('paths').insert({
        methodType: methodType,
        pathName: pathName,
        descriptionVerb: descriptionVerb,
        path: path,
        parameter: parameter,
        headersValue: headersValue,
        bodyValue: bodyValue,
        data: data,
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
      methodType: req.body.methodType,
      pathName: req.body.pathName,
      descriptionVerb: req.body.descriptionVerb,
      path: req.body.path,
      parameter: req.body.parameter,
      headersValue: req.body.headersValue,
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

export default new Path()
