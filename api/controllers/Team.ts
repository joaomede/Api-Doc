import { Response } from 'express'
import apiDoc from '../config/api'
import { NewRequest } from '../interface/NewRequest'
import resp from 'resp-express'

class Team {
  public async store (req: NewRequest, res: Response): Promise<void> {
    try {
      const message = await apiDoc.createTeam(req.userId, req.body)
      resp.returnSucessMessage(res, message)
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  public async update (req: NewRequest, res: Response): Promise<void> {
    const { id } = req.params
    try {
      const newTeam = await apiDoc.updateTeam(req.userId, Number(id), req.body)
      resp.returnSucessObject(res, newTeam)
    } catch (error) {
      resp.returnErrorMessage(res, error)
    }
  }

  public async index (req: NewRequest, res: Response): Promise<void> {
    try {
      const team = await apiDoc.getAllTeamByUserId(req.userId)
      resp.returnSucessObject(res, team)
    } catch (error) {
      resp.returnErrorMessage(res, error)
    }
  }

  public async destroy (req: NewRequest, res: Response): Promise<void> {
    const { id } = req.params
    try {
      await apiDoc.deleteTeam(req.userId, Number(id))
      resp.returnSucessMessage(res, 'O Time foi apagado com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, error)
    }
  }

  public async addMember (req: NewRequest, res: Response): Promise<void> {
    try {
      await apiDoc.addMember(req.userId, req.body)
      resp.returnSucessMessage(res, 'Membro adicionado com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, error)
    }
  }

  public async removeMember (req: NewRequest, res: Response): Promise<void> {
    const { id } = req.params
    try {
      await apiDoc.removeMember(Number(id))
      resp.returnSucessMessage(res, 'Membro removido com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  public async listAllMembers (req: NewRequest, res: Response): Promise<void> {
    const { teamIdFk } = req.params

    try {
      const team = apiDoc.listAllMembers(req.userId, Number(teamIdFk))
      resp.returnSucessObject(res, team)
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }
}

export default new Team()
