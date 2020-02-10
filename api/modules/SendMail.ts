import mail from '../modules/Mailer'
import { smtp } from '../config/smtp'

export default new class SendMail {
  /**
   * Send E-mail
   *
   * @param email Recipient's Email
   * @param fromMessage Title of the sender
   * @param subject Subject treated
   * @param context Context: Html or text
   */
  public async sendEmail (email: string, fromMessage: string, subject: string, context: string): Promise<void> {
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
}()
