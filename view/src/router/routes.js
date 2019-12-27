
const routes = [
  {
    path: '/',
    redirect: '/apidoc'
  },
  {
    path: '/apidoc',
    name: 'ApiDoc',
    component: () => import('../pages/ApiDoc')
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
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login')
  },
  {
    path: '/changepassword',
    name: 'ChangePassword',
    component: () => import('../pages/ChangePassword'),
    meta: { requerAuth: true }
  },
  {
    path: '/endpoint/:id',
    name: 'EndPoint',
    component: () => import('../pages/EndPoint'),
    props: true
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/ApiDoc')
  })
}
export default routes
