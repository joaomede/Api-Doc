import VueI18n from 'vue-i18n'
import messages from 'src/i18n'
import Vue from 'vue'

Vue.use(VueI18n)

let i18n = new VueI18n({
  locale: 'en-us',
  fallbackLocale: 'en-us',
  messages
})

export default ({ app, Vue }) => {
  app.i18n = i18n
}

export { i18n }
