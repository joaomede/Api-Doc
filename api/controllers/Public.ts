import apiDoc from '../config/api'
import { Api } from 'api-doc-js-sdk'
import { NewRequest } from '../interface/NewRequest'
import resp from 'resp-express'
import { Response } from 'express'

export default new class Geral {
  public async getApiAndTags (req: NewRequest, res: Response): Promise<void> {
    const { id } = req.params
    try {
      const api: Api = await apiDoc.getApiAndTagsPublic(Number(id))
      resp.returnSucessObject(res, api)
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  public async getPathAndResponses (req: NewRequest, res: Response): Promise<void> {
    const { tagId } = req.params
    try {
      const pathAndCores = await apiDoc.getPathAndResponsesPublic(Number(tagId))
      resp.returnSucessObject(res, pathAndCores)
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  public async listAllPublicApi (req: NewRequest, res: Response): Promise<void> {
    try {
      const allPublicList = await apiDoc.listAllPublicApi()
      resp.returnSucessObject(res, allPublicList)
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }
}()
