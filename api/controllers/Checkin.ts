import { Response, Request } from 'express'
import resp from 'resp-express'

export default new class Checkin {
  public async checkin (req: Request, res: Response): Promise<void> {
    resp.returnSucessMessage(res, 'sucesso')
  }
}()
