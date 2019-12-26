
const routes = [
  {
    path: "*",
    redirect: "/apidoc"
  },
  {
    path: "/",
    redirect: "/apidoc"
  },
  {
    path: "/apidoc",
    name: "apidoc",
    component: () => import("../pages/apidoc"),
  },
  {
    path: "/sobre",
    name: "sobre",
    component: () => import("../pages/sobre"),
  },
  {
    path: "/dash",
    name: "dash",
    component: () => import("../pages/dash"),
    meta: { requerAuth: true }
  },
  {
    path: "/feedversion",
    name: "feedversion",
    component: () => import("../pages/feedversion"),
    meta: { requerAuth: true }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/login"),
  },
  {
    path: "/trocasenha",
    name: "trocasenha",
    component: () => import("../pages/trocasenha"),
    meta: { requerAuth: true }
  },
  {
    path: "/endpoints/:id",
    name: "endpoints",
    component: () => import("../components/endpoints"),
    props: true,
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  /*routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })*/
}
export default routes
