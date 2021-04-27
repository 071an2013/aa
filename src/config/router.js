import HeaderLeftMainLayout from '@/framework/layouts/HeaderLeftMainLayout';

/**
 * 路由配置。
 * 
 * 官方文档：
 * https://router.vuejs.org/zh/guide/essentials/nested-routes.html
 * 
 * 对于一些详情页的路由设置：
 * 添加路由 meta：menu，以便在打开详情页路由时，正确标识当前菜单项。
 * {
 *    path: '/demo/pages/table/select-table/:id',
 *    component: HeaderLeftMainLayout,
 *    children: [
 *      {
 *        path: '',
 *        meta: {
 *          title: '客户详情页',
 *          menu: '/demo/pages/table/select-table',
 *        },
 *        component: HelloWorld
 *      }
 *    ]
 * }
 */
const myRoutes = [{
  path: '/home',
  component: HeaderLeftMainLayout,
  children: [
    {
      path: '',
      component: () => import(`../pages/home`)
    },
  ]
}, {
  path: '/service',
  component: HeaderLeftMainLayout,
  children: [
    {
      path: 'list',
      component: () => import(`../pages/service/list`)
    }
  ]
}, {
  path: '/resource',
  component: HeaderLeftMainLayout,
  children: [
    {
      path: '',
      component: () => import(`../pages/resource-list`)
    },
  ]
}
  // 可以使用自定义的 404 页面，覆盖默认的。
  // , {
  //   path: '*',
  //   component: HeaderLeftMainLayout,
  //   children: [{
  //     path: '',
  //     component: () => import(`../components/My404.vue`)
  //   }]
  // }
]

export default myRoutes