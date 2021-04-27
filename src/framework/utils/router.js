import siteOptions from '@/config/index'
import { getDemoRoutes, getFavLayout } from '@/framework/utils/config'
import HeaderLeftMainLayout from '@/framework/layouts/HeaderLeftMainLayout'

import frameworkUserRouter from '@/config/router'
import { getPageRouterList, addMenuTab } from '@/framework/utils/layout'

// 资源加载进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({
  minimum: 0.1,
  easing: 'ease',
  speed: 500,
  showSpinner: false
});

export function getAppRouter(appRouter, mainMenuConfig) {
  const finalRoutes = frameworkUserRouter;
  // 示例页面路由。
  const demoRoutes = (getDemoRoutes()['pages']).map(page => {
    return {
      path: page['router'] || page['path'],
      component: HeaderLeftMainLayout,
      children: [{
        path: '',
        meta: page['meta'] || {},
        component: () => import(`@/framework${page['path']}/index.js`)
      }]
    }
  })

  // 手动从代码中添加的路由。
  const customRoutes = []
  if (siteOptions['indexPath'] && siteOptions['indexPath'] != '/') {
    // indexPath 为 '/' 时，会爆栈，所以要排除。
    customRoutes.push({
      path: '/',
      redirect: siteOptions['indexPath']
    })
  }

  customRoutes.push({
    path: '*/iframe',
    component: HeaderLeftMainLayout,
    children: [{
      path: '',
      component: () => import('@/framework/components/IFramePage.vue')
    }]
  })

  customRoutes.push({
    path: '*',
    component: HeaderLeftMainLayout,
    children: [{
      path: '',
      component: () => import('@/framework/components/Page404.vue')
    }]
  })

  // 应用全局 layout。
  let allRoutes = [...demoRoutes, ...finalRoutes, ...customRoutes]
  let favLayout = getFavLayout()
  if (favLayout) {
    allRoutes.forEach(route => {
      route['component'] = () => import(`@/framework/layouts/${favLayout}`)
    })
  }

  if (siteOptions['customTheme']) {
    allRoutes.forEach(route => {
      route['component'] = siteOptions['customTheme']
    })
  }

  appRouter.addRoutes(allRoutes)
  appRouter.afterEach((to, from) => {
    NProgress.start()
    let routerPath = to.fullPath
    let menuTitle = ''
    let tabGroup = ''
    if (routerPath != '/') {
      if (to['meta'] && to['meta']['menu']) {
        // 处理多路由指向同一菜单的场景。
        routerPath = to['meta']['menu']
      }
      menuTitle = getPageRouterList(mainMenuConfig, routerPath);
      if (menuTitle.length) {
        let temp = menuTitle[menuTitle.length - 1]
        menuTitle = temp['name']
        tabGroup = temp['tab-group'] || temp['app-group'] || temp['group']
      } else {
        menuTitle = '404'
      }
    } else {
      menuTitle = '首页'
    }
    addMenuTab({
      title: menuTitle,
      name: routerPath,
      path: routerPath,
      group: tabGroup
    })
  })
  appRouter.afterEach(transition => {
    NProgress.done()
  })
  routerPushBugFix(appRouter)
  return appRouter
}

function routerPushBugFix(appRouter) {
  const routerOriginalPush = appRouter.__proto__.push
  appRouter.__proto__.push = function () {
    return routerOriginalPush.apply(this, Array.from(arguments)).catch(err => {
      err && err.name != 'NavigationDuplicated' && console.error(err)
    })
  }
}