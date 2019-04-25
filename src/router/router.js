
let router = [
  {
    path: '/',
    name: 'testpage',
    component: resolve => require(['@/page/index.vue'], resolve),
    redirect: '/testpage',
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
      },
      {
        path: '/document',
        name: 'document',
        component: resolve => require(['@/page/document/index.vue'], resolve)
      },
      {
        path: '/testPage',
        name: 'testpage',
        component: resolve => require(['@/page/testPage/index.vue'], resolve)
      },
      {
        path: '/management',
        name: 'management',
        component: resolve => require(['@/page/management/index.vue'], resolve)
      }
    ]
  },
]

export default router