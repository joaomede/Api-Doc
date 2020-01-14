import { knex } from '../db/connection'
import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import resp from 'resp-express'

class Responses {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async store (req: NewRequest, res: Response): Promise<any> {
    const { typeCode, reason, responseModel } = req.body
    const { verbId } = req.params

    if (verbId === undefined || verbId === null) {
      resp.returnErrorMessage(res, 'Verbo Associado não foi referênciado')
    }

    try {
      const result = await knex('responses').insert({
        typeCode: typeCode,
        reason: reason,
        responseModel: responseModel,
        userIdFk: req.userId,
        pathsIdFk: verbId
      }).returning('*')
      resp.returnSucessObject(res, result)
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar criar o código resposta')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async index (req: NewRequest, res: Response): Promise<any> {
    const { verbId } = req.params

    if (verbId === undefined || verbId === null) {
      resp.returnErrorMessage(res, 'Verbo Associado não foi referênciado')
    }

    try {
      const tags = await knex('responses').where({ userIdFk: req.userId, pathsIdFk: verbId })
      resp.returnSucessObject(res, tags)
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar carregar todos os códigos respostas')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async update (req: NewRequest, res: Response): Promise<any> {
    const { id } = req.params

    const newCode = {
      typeCode: req.body.typeCode,
      reason: req.body.reason,
      responseModel: req.body.responseModel
    }

    try {
      await knex('responses').where({ id: id, userIdFk: req.userId }).update(newCode)
      resp.returnSucessMessage(res, 'O Código resposta foi atualizado com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar atualizar o código resposta')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async destroy (req: NewRequest, res: Response): Promise<any> {
    const { id } = req.params

    if (id === undefined || id === null) {
      resp.returnErrorMessage(res, 'Não foi identificado a referência do Código resposta')
    }
    // precisa remover em cascata
    try {
      await knex('responses').where({ id: id, userIdFk: req.userId }).del()
      resp.returnSucessMessage(res, 'Código resposta apagado com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar apagar Código resposta')
    }
  }
}

export default new Responses()
