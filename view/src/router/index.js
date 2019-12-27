import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import firebase from 'firebase'
Vue.use(VueRouter)

const Router = new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes,
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE
})

Router.beforeEach((to, from, next) => {
  let autorizacao = to.matched.some(record => record.meta.requerAuth)
  // let adminAuth = to.matched.some(record => record.meta.adminAuth)

  if (autorizacao) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        next({
          path: '/apidoc'
        })
      } else {
        next()
      }
    })
  } else {
    next()
  }
})

export default Router
