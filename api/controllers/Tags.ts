import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import apiDoc from '../config/api'
import resp from 'resp-express'

export default new class EndPoint {
  public async store (req: NewRequest, res: Response): Promise<void> {
    const { apiId } = req.params

    try {
      const result = await apiDoc.createNewTag(req.userId, Number(apiId), req.body)
      resp.returnSucessObject(res, result)
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  public async update (req: NewRequest, res: Response): Promise<void> {
    const id = req.params.id
    try {
      await apiDoc.updateTagById(req.userId, Number(id), req.body)
      resp.returnSucessMessage(res, 'Api atualizada com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  public async index (req: NewRequest, res: Response): Promise<void> {
    const { apiId } = req.params

    try {
      const tags = await apiDoc.getAllTagById(req.userId, Number(apiId))
      resp.returnSucessObject(res, tags)
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  public async destroy (req: NewRequest, res: Response): Promise<void> {
    const { id } = req.params

    try {
      await apiDoc.deleteTagByIdAndUserId(req.userId, Number(id))
      resp.returnSucessMessage(res, 'Endpoint removido com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }
}()
