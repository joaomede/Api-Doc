import Vue from 'vue'
import VueRouter from 'vue-router'
import { Cookies } from 'quasar'
import { http } from '../boot/axios'

Vue.use(VueRouter)

export default function ({ ssrContext }) {
  let allRoutes = [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../pages/Login')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../pages/About')
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
      component: () => import('../pages/PublicList'),
      meta: { requerAuth: true }
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
      component: () => import('../pages/DocViewPublic'),
      meta: { requerAuth: true }
    },
    {
      path: '/changepassword',
      name: 'ChangePassword',
      component: () => import('../pages/ChangePassword'),
      meta: { requerAuth: true }
    }
  ]

  if (process.env.MODE !== 'ssr') {
    allRoutes.push({
      path: '*',
      redirect: '/login'
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
    let cookies

    if (process.env.MODE !== 'ssr') {
      user = Cookies.get('user')
    } else {
      cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies // otherwise we're on client
      user = cookies.get('user')
    }

    if (autorizacao) {
      if (user) {
        http
          .get('api/auth/checkin', { headers: user.headers })
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
