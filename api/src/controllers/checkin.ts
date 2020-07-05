import { Response, Request } from 'express'
import resp from 'resp-express'

class Checkin {
  public async checkin (req: Request, res: Response): Promise<void> {
    resp.returnSucessMessage(res, 'sucesso')
  }
}

export default new Checkin()
