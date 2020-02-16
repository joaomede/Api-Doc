import { i18n } from './i18n'
import Vue from 'vue'
Vue.filter('checksLetters', function (item) {
  if (item === 'POST') {
    return 'fa fa-p'
  }
  if (item === 'DELETE') {
    return 'fa fa-d'
  }
  if (item === 'GET') {
    return 'fa fa-g'
  }
  if (item === 'PUT') {
    return 'fa fa-u'
  }
})

Vue.filter('checkMethodColor', function (item) {
  if (item === 'POST') {
    return 'text-green'
  }
  if (item === 'DELETE') {
    return 'text-red'
  }
  if (item === 'GET') {
    return 'text-purple'
  }
  if (item === 'PUT') {
    return 'text-orange'
  }
})

Vue.filter('filterColorBackground', function (item) {
  if (item === 'POST') {
    return 'background-color: #4caf5018'
  }
  if (item === 'DELETE') {
    return 'background-color: #f4433618'
  }
  if (item === 'GET') {
    return 'background-color: #9c27b018'
  }
  if (item === 'PUT') {
    return 'background-color: #ff980018'
  }
})

Vue.filter('filterParamsName', function (param) {
  let params = ''
  for (let index = 0; index < param.length; index++) {
    params = `${params}/{${param[index].parameterName}}`
  }
  return params
})

Vue.filter('filterReasonCode', function (code) {
  return i18n.t(`commonCodes.${code}.reason`)
})

Vue.filter('filterCodeStatus', function (code) {
  return i18n.t(`commonCodes.${code}.code`)
})
