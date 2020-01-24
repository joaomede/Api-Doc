import Vue from 'vue'
import VueRouter from 'vue-router'
import { LocalStorage } from 'quasar'
import axios from 'axios'

Vue.use(VueRouter)

export default function ({ ssrContext }) {
  let allRoutes = [
    {
      path: '/',
      redirect: '/publicdocs'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../pages/Login')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../pages/Register')
    },
    {
      path: '/changepassword',
      name: 'ChangePassword',
      component: () => import('../pages/ChangePassword'),
      meta: { requerAuth: true }
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../pages/About')
    },
    {
      path: '/electron',
      name: 'WelComeElectron',
      component: () => import('../pages/WelcomeElectron')
    },
    {
      path: '/dash',
      name: 'Dash',
      component: () => import('../pages/Dash'),
      meta: { requerAuth: true }
    },
    {
      path: '/publicdocs',
      name: 'PublicList',
      component: () => import('../pages/PublicList')
    },
    {
      path: '/privatedocs',
      name: 'PrivateList',
      component: () => import('../pages/PrivateList'),
      meta: { requerAuth: true }
    },
    {
      path: '/teamdocs',
      name: 'TeamDocs',
      component: () => import('../pages/TeamDocs'),
      meta: { requerAuth: true }
    },
    {
      path: '/manageteams',
      name: 'ManageTeams',
      component: () => import('../pages/ManageTeams'),
      meta: { requerAuth: true }
    },
    {
      path: '/membermanager/:id',
      props: true,
      name: 'MemberManager',
      component: () => import('../pages/MemberManager'),
      meta: { requerAuth: true }
    },
    {
      path: '/docview/:id',
      name: 'DocView',
      props: true,
      component: () => import('../pages/DocView'),
      meta: { requerAuth: true }
    },
    {
      path: '/docviewteam/:id',
      name: 'DocViewTeam',
      props: true,
      component: () => import('../pages/DocViewTeam'),
      meta: { requerAuth: true }
    },
    {
      path: '/docviewpublic/:id',
      name: 'DocViewPublic',
      props: true,
      component: () => import('../pages/DocViewPublic')
    },
    {
      path: '/sharedviewdoc/:id',
      name: 'SharedViewDoc',
      props: true,
      component: () => import('../pages/DocViewPublic')
    }
  ]

  if (process.env.MODE !== 'ssr') {
    allRoutes.push({
      path: '*',
      redirect: '/publicdocs'
    })
  }
  const router = new VueRouter({
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
    routes: allRoutes
  })

  router.beforeEach((to, from, next) => {
    let autorizacao = to.matched.some(record => record.meta.requerAuth)
    let user
    let url

    if (process.env.MODE !== 'ssr') {
      user = LocalStorage.getItem('user')
      url = LocalStorage.getItem('urlAPI')
    } else {
      user = LocalStorage.getItem('user')
      url = LocalStorage.getItem('urlAPI')
    }
    if (autorizacao) {
      if (user) {
        axios
          .get(url + 'api/auth/checkin', { headers: user.headers })
          .then(() => {
            next()
          })
          .catch(() => {
            next({ path: '/login' })
          })
      } else {
        next({ path: '/login' })
      }
    } else {
      next()
    }
  })

  return router
}
