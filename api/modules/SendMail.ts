import { smtp } from '../config/smtp'
import nodemailer = require('nodemailer')
const { secure, user, pass, tls } = smtp
class SendMail {
  /**
   * Send E-mail
   *
   * @param email Recipient's Email
   * @param fromMessage Title of the sender
   * @param subject Subject treated
   * @param context Context: Html or text
   */
  public async sendEmail (email: string, fromMessage: string, subject: string, context: string): Promise<void> {
    const mail = nodemailer.createTransport({
      service: 'gmail',
      secure,
      auth: { user, pass },
      tls
    })
    try {
      await mail.sendMail({
        to: email,
        from: `${fromMessage} <${smtp.user}>`,
        subject: `${subject}`,
        text: context,
        html: `<div>${context}<div>`
      })
    } catch (error) {
      if (error) {
        throw new Error('Erro when trying send e-mail')
      }
    }
  }
}

export default new SendMail()
