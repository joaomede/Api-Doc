import { Response } from 'express'
import { knex } from '../db/connection'
import { NewRequest } from '../interface/NewRequest'
import resp from 'resp-express'

class Team {
  public async store (req: NewRequest, res: Response): Promise<any> {
    const { apiIdFk, nameTeam } = req.body
    try {
      const api = await knex('api').select().where({ id: apiIdFk })

      if (api.length !== 0) {
        if (api[0].userIdFK === req.userId && api[0].isPublic === false) {
          const newTeam = await knex('teams').insert({
            nameTeam: nameTeam,
            apiIdFk: apiIdFk,
            managerIdFk: req.userId
          }).returning('*')
          resp.returnSucessObject(res, newTeam)
        } else {
          resp.returnErrorMessage(res, 'A Api informada não é sua ou ela não é publica')
        }
      } else {
        resp.returnErrorMessage(res, 'Api relacionada não existe')
      }
    } catch (error) {
      resp.returnErrorMessage(res, error)
    }
  }

  public async update (req: NewRequest, res: Response): Promise<any> {
    const { id } = req.params
    const { apiIdFk, nameTeam } = req.body

    const team = await knex('teams').select().where({ id: id })

    try {
      if (team[0].managerIdFk === req.userId) {
        const newTeam = await knex('teams').update({
          nameTeam: nameTeam,
          apiIdFk: apiIdFk
        }).returning('*')
        resp.returnSucessObject(res, newTeam)
      } else {
        resp.returnErrorMessage(res, 'Você não tem autorização para atualizar o time')
      }
    } catch (error) {
      resp.returnErrorMessage(res, error)
    }
  }

  public async index (req: NewRequest, res: Response): Promise<any> {
    try {
      const team = await knex('teams').select().where({ managerIdFk: req.userId })
      resp.returnSucessObject(res, team)
    } catch (error) {
      resp.returnErrorMessage(res, error)
    }
  }

  public async destroy (req: NewRequest, res: Response): Promise<any> {
    const { id } = req.params
    try {
      await knex('teams').where({ id: id }).del()
      resp.returnSucessMessage(res, 'O Time foi apagado com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, error)
    }
  }

  public async addMember (req: NewRequest, res: Response): Promise<any> {
    const { teamIdFk, email } = req.body
    try {
      const team = await knex('team').select().where({
        id: teamIdFk,
        managerIdFk: req.userId
      })
      const user = await knex('users').select().where({ email: email })
      if (team.length !== 0) {
        if (user.length !== 0) {
          if (team[0].managerIdFk === req.userId) {
            const result = await knex('team_rules').insert({
              teamIdFk: teamIdFk,
              userIdFK: user[0].id
            }).returning('*')
            resp.returnSucessObject(res, result)
          } else {
            resp.returnErrorMessage(res, 'Você não tem autorização para adicionar membros')
          }
        } else {
          resp.returnErrorMessage(res, 'O email informado não pertence a nenhum usuário')
        }
      } else {
        resp.returnErrorMessage(res, 'O time informado não existe')
      }
    } catch (error) {
      resp.returnErrorMessage(res, error)
    }
  }

  public async removeMember (req: NewRequest, res: Response): Promise<any> {
    const { id } = req.params
    try {
      await knex('team_rules').where({ id: id }).del()
      resp.returnSucessMessage(res, 'Membro removido com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, error)
    }
  }
}

export default new Team()
