import { knex } from '../db/connection'
import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import resp from 'resp-express'

class CodesResp {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async store (req: NewRequest, res: Response): Promise<any> {
    const { typeCode, reason, responseModel, headers } = req.body
    const { verbId } = req.params

    if (verbId === undefined || verbId === null) {
      resp.returnErrorMessage(res, 'Verbo Associado não foi referênciado')
    }

    try {
      await knex('codesresp').insert({
        typeCode: typeCode,
        reason: reason,
        responseModel: responseModel,
        headers: headers,
        userIdFk: req.userId,
        verbIdFk: verbId
      })
      resp.returnSucessMessage(res, 'Código resposta criado com sucesso')
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
      const endpoint = await knex('codesresp').where({ userIdFk: req.userId, verbIdFk: verbId })
      resp.returnSucessObject(res, endpoint)
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar carregar todos os códigos respostas')
    }
  }
}

export default new CodesResp()
