
import Vue from 'vue'
Vue.filter('verificaLetra', function (item) {
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

Vue.filter('verificaCor', function (item) {
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

Vue.filter('filtrarCorBackground', function (item) {
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
    console.log(params)
    params = `${params}/{${param[index].parameterName}}`
  }
  return params
})
