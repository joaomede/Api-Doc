import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()
const secret = process.env.SECRET
class Plugin {
  /**
   *
   * @param params Retorna o token decodificado com validade
   * @param validade Validade do token, ex: 7d
   */
  public async generateToken (params: string | object, validade: string): Promise<string> {
    return jwt.sign(params, secret, {
      expiresIn: validade
    })
  }
}

export default new Plugin()
