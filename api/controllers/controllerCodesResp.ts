import { knex } from '../db/connection'
import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import resp from 'resp-express'

class CodesResp {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async store (req: NewRequest, res: Response): Promise<any> {
    const { typeCode, reason, responseModel, headers } = req.body
    const { verbsId } = req.params

    try {
      await knex('codesresp').insert({
        typeCode: typeCode,
        reason: reason,
        responseModel: responseModel,
        headers: headers,
        userIdFk: req.userId,
        verbIdFk: verbsId
      })
      resp.returnSucessMessage(res, 'Código resposta criado com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar criar o código respsta')
    }
  }
}

export default new CodesResp()
