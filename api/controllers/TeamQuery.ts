
import { knex } from '../db/connection'
import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import resp from 'resp-express'
import knexPopulate from 'knex-populate'

class ApiTeam {
  public async getApiAndEndPoints (req: NewRequest, res: Response): Promise<void> {
    const { id } = req.params

    const rules = await knex('team_rules')
      .where({ 'team_rules.id': id, userIdFk: req.userId })
      .join('teams', 'teams.id', 'team_rules.teamIdFk')
      .select('teams.apiIdFk')

    try {
      if (rules.length !== 0) {
        const api = await knex('api').where({ id: rules[0].apiIdFk })
        const tags = await knex('tags').where({ apiIdFk: rules[0].apiIdFk })
        api[0].tags = tags

        if (api.length === 0) {
          resp.returnErrorMessage(res, 'A api que você está tentando acessar não foi encontrada')
        } else {
          resp.returnSucessObject(res, api[0])
        }
      } else {
        resp.returnErrorMessage(res, 'A equipe informada foi encontrada ou você não faz parte')
      }
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar carregar a documentação')
    }
  }

  public async getPathAndResponses (req: NewRequest, res: Response): Promise<void> {
    const { id, endPointId } = req.params

    const rules = await knex('team_rules')
      .where({ 'team_rules.id': id, userIdFk: req.userId })
      .join('teams', 'teams.id', 'team_rules.teamIdFk')
      .select('teams.apiIdFk')

    try {
      if (rules.length !== 0) {
        const verbAndCodes = await knexPopulate(knex, 'paths')
          .find({ tagsIdFk: endPointId })
          .populate('responses', 'pathsIdFk', 'responses')
          .exec()

        if (verbAndCodes.length === 0) {
          resp.returnErrorMessage(res, 'Não há verbos disponíveis')
        } else {
          resp.returnSucessObject(res, verbAndCodes)
        }
      } else {
        resp.returnErrorMessage(res, 'A equipe informada foi encontrada ou você não faz parte')
      }
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar expandir')
    }
  }

  public async listTeamsIAmMember (req: NewRequest, res: Response): Promise<void> {
    try {
      const teamsAmMember = await knex('team_rules')
        .where({ 'team_rules.userIdFk': req.userId })
        .join('teams', 'teams.id', 'team_rules.teamIdFk')
        .join('api', 'api.id', 'teams.apiIdFk')
        .join('users', 'teams.managerIdFk', 'users.id')
        .select('team_rules.id', 'teams.teamName', 'api.apiName', 'users.name')
      resp.returnSucessObject(res, teamsAmMember)
    } catch (error) {
      resp.returnErrorMessage(res, "Erro ao carregar a lista de Api's")
    }
  }

  public async exitTeam (req: NewRequest, res: Response): Promise<void> {
    const { id } = req.params

    try {
      const result = await knex('team_rules').where({ id: id, userIdFk: req.userId })

      if (result.length !== 0) {
        await knex('team_rules').where({ id: id, userIdFk: req.userId }).del()
        resp.returnSucessMessage(res, 'Você saiu dessa equipe')
      } else {
        resp.returnErrorMessage(res, 'Erro ao tentar sair desta equipe')
      }
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar sair da equipe')
    }
  }
}

export default new ApiTeam()
