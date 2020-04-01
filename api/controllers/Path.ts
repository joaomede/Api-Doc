import apiDoc from '../config/api'
import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import resp from 'resp-express'

class Path {
  public async store (req: NewRequest, res: Response): Promise<void> {
    const { tagId } = req.params
    try {
      const result = await apiDoc.createNewPath(req.userId, Number(tagId), req.body)
      resp.returnSucessObject(res, result)
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  public async index (req: NewRequest, res: Response): Promise<void> {
    const { tagId } = req.params
    try {
      const path = await apiDoc.getAllPathByIdAndUserId(req.userId, Number(tagId))
      resp.returnSucessObject(res, path)
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar carregar todos os EndPoints')
    }
  }

  public async update (req: NewRequest, res: Response): Promise<void> {
    const { id } = req.params
    try {
      await apiDoc.updatePath(req.userId, Number(id), req.body)
      resp.returnSucessMessage(res, 'O verbo foi atualizado com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  public async destroy (req: NewRequest, res: Response): Promise<void> {
    const { id } = req.params
    try {
      await apiDoc.deletePathById(req.userId, Number(id))
      resp.returnSucessMessage(res, 'Verbo apagado com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }
}

export default new Path()
