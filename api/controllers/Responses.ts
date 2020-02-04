import apiDoc from '../config/api'
import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import resp from 'resp-express'

class Responses {
  public async store (req: NewRequest, res: Response): Promise<void> {
    const { pathId } = req.params
    try {
      const result = await apiDoc.createNewResponse(req.userId, Number(pathId), req.body)
      resp.returnSucessObject(res, result)
    } catch (error) {
      resp.returnErrorMessage(res, error.messsage)
    }
  }

  public async index (req: NewRequest, res: Response): Promise<void> {
    const { pathId } = req.params
    try {
      const responses = await apiDoc.getAllResponsesByPathAndUserId(req.userId, Number(pathId))
      resp.returnSucessObject(res, responses)
    } catch (error) {
      resp.returnErrorMessage(res, error.messsage)
    }
  }

  public async update (req: NewRequest, res: Response): Promise<void> {
    const { id } = req.params
    try {
      await apiDoc.updateResponse(req.userId, Number(id), req.body)
      resp.returnSucessMessage(res, 'O Código resposta foi atualizado com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  public async destroy (req: NewRequest, res: Response): Promise<void> {
    const { id } = req.params
    try {
      await apiDoc.deleteResponse(req.userId, Number(id))
      resp.returnSucessMessage(res, 'Código resposta apagado com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }
}

export default new Responses()
