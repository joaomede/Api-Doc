import { Notify } from 'quasar'

export default async ({ Vue }) => {
  Vue.prototype.$notifiy = function (mensagem, cor) {
    Notify.create({
      message: mensagem,
      color: cor
    })
  }
}

Notify.setDefaults({
  // position: 'bottom',
  timeout: 2500,
  textColor: 'white',
  actions: [{ icon: 'close', color: 'white' }]
})
