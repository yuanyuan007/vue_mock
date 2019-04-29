
let router = [
  {
    path: '/',
    name: 'testpage',
    component: resolve => require(['@/page/index.vue'], resolve),
    redirect: '/creditSuper',
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
        path: '/creditSuper',
        name: 'creditSuper',
        component: resolve => require(['@/page/creditSuper/index.vue'], resolve)
      },
      {
        path: 'creditSuperRight',
        name: 'creditSuperRight',
        component: resolve => require(['@/components/creditSuperRight.vue'], resolve)
      },
      {
        path: 'text1',
        name: 'text1',
        component: resolve => require(['@/components/text1.vue'], resolve)
      },
      {
        path: 'animation',
        name: 'animation',
        component: resolve => require(['@/components/animation.vue'], resolve)
      },
      {
        path: 'text',
        name: 'text',
        component: resolve => require(['@/components/text.vue'], resolve)
      },
      {
        path: 'financialStatistics',
        name: 'financialStatistics',
        component: resolve => require(['@/page/financialStatistics/index.vue'], resolve)
      },
      {
        path: 'vcharts',
        name: 'vcharts',
        component: resolve => require(['@/page/vcharts/index.vue'], resolve)
      },
      {
        path: 'dateQuery',
        name: 'dateQuery',
        component: resolve => require(['@/page/dateQuery/index.vue'], resolve)
      },
      {
        path: 'receivableStatistics',
        name: 'receivableStatistics',
        component: resolve => require(['@/page/receivableStatistics/index.vue'], resolve)
      },
      {
        path: 'consumption',
        name: 'consumption',
        component: resolve => require(['@/page/consumption/index.vue'], resolve)
      }
    ]
  },
]

export default router