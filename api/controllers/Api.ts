import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import resp from 'resp-express'
import apiDoc from '../config/api'

export default new class Api {
  public async store (req: NewRequest, res: Response): Promise<void> {
    try {
      await apiDoc.createNewApiDoc(req.userId, req.body)
      resp.returnSucessMessage(res, 'Api adicionada com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  public async update (req: NewRequest, res: Response): Promise<void> {
    const id = req.params.id
    try {
      await apiDoc.updateApiById(req.userId, Number(id), req.body)
      resp.returnSucessMessage(res, 'Api atualizada com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  public async index (req: NewRequest, res: Response): Promise<void> {
    try {
      const allApiByUser = await apiDoc.getAllApiByUser(req.userId)
      resp.returnSucessObject(res, allApiByUser)
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  public async indexPrivate (req: NewRequest, res: Response): Promise<void> {
    try {
      const allApiByUser = await apiDoc.getAllApiByUserAndVisibility(req.userId, false)
      resp.returnSucessObject(res, allApiByUser)
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  public async indexOne (req: NewRequest, res: Response): Promise<void> {
    const { apiId } = req.params
    try {
      const api = await apiDoc.getOneApi(req.userId, Number(apiId))
      resp.returnSucessObject(res, api)
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  public async destroy (req: NewRequest, res: Response): Promise<void> {
    const { id } = req.params

    if (id === undefined || id === null) {
      resp.returnErrorMessage(res, 'Não foi identificado a referência da Api')
    }

    try {
      await apiDoc.deleteApiById(req.userId, Number(id))
      resp.returnSucessMessage(res, 'Documentação deletada com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  public async getApiAndTags (req: NewRequest, res: Response): Promise<void> {
    const { id } = req.params
    const apiId = Number(id)

    try {
      const api = await apiDoc.getApiAndTags(req.userId, apiId)
      resp.returnSucessObject(res, api)
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  public async getPathAndResponses (req: NewRequest, res: Response): Promise<void> {
    const { tagId } = req.params

    try {
      const pathAndResponses = await apiDoc.getPathAndResponses(apiDoc.knex(), tagId)

      if (pathAndResponses.length === 0) {
        resp.returnErrorMessage(res, 'Não há verbos disponíveis')
      } else {
        if (pathAndResponses[0].userIdFk === req.userId) {
          resp.returnSucessObject(res, pathAndResponses)
        } else {
          resp.returnErrorMessage(res, 'Você não tem autorização para acessar essa documentação')
        }
      }
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }
}()
