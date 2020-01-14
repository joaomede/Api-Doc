import VueI18n from 'vue-i18n'

import messages from 'src/i18n'

export default ({ app, Vue }) => {
  Vue.use(VueI18n)

  app.i18n = new VueI18n({
    locale: 'en-us',
    fallbackLocale: 'en-us',
    messages
  })
}
