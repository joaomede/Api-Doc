import Vue from 'vue'
import { required, email, min } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

extend('required', {
  ...required,
  message: 'Esse campo é requerido'
})

extend('email', {
  ...email,
  message: 'O formato do e-mail precisa ser válido'
})

extend('min', {
  ...min,
  message: 'Necessário no minimo {length} caracteres'
})
