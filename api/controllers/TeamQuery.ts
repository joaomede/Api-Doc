
import apiDoc from '../config/api'
import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import resp from 'resp-express'

export default new class ApiTeam {
  public async getApiAndTags (req: NewRequest, res: Response): Promise<void> {
    const { id } = req.params

    try {
      const api = await apiDoc.getApiAndTagsTeam(req.userId, Number(id))
      resp.returnSucessObject(res, api)
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  public async getPathAndResponses (req: NewRequest, res: Response): Promise<void> {
    const { id, tagId } = req.params
    try {
      const pathAndResponse = await apiDoc.getPathAndResponsesTeam(apiDoc.knex(), req.userId, Number(tagId), Number(id))
      resp.returnSucessObject(res, pathAndResponse)
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  public async listTeamsIAmMember (req: NewRequest, res: Response): Promise<void> {
    try {
      const teamsAmMember = await apiDoc.listTeamsOwner(req.userId)
      resp.returnSucessObject(res, teamsAmMember)
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  public async exitTeam (req: NewRequest, res: Response): Promise<void> {
    const { id } = req.params
    try {
      await apiDoc.exitTeam(req.userId, Number(id))
      resp.returnSucessMessage(res, 'Você saiu dessa equipe')
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }
}()
