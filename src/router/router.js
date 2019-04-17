
let router = [
  {
    path: '/',
    name: 'index',
    component: resolve => require(['@/page/index.vue'], resolve),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: resolve => require(['@/page/home/index.vue'], resolve)
      },
      {
        path: '/guidePage',
        name: 'guidePage',
        component: resolve => require(['@/page/guidePage/index.vue'], resolve)
      }, {
        path: '/document',
        name: 'document',
        component: resolve => require(['@/page/document/index.vue'], resolve)
      }
    ]
  },
]

export default router