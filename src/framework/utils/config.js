import siteOptions from '@/config/index'

export function getDemoMenus() {
  let demoMenuConfig = []
  if (siteOptions['isShowDemoPages']) {
    demoMenuConfig = (require('@/framework/demo/menu.json'))['menus']
  }
  return demoMenuConfig
}

export function getIsTabbedMenu() {
  let isTabbedMenu = siteOptions['isTabbedMenu'] || false
  let favIsTabbedMenu = localStorage.getItem('fav-is-tabbed-menu')
  if (favIsTabbedMenu) {
    isTabbedMenu = favIsTabbedMenu === '1'
  }
  return isTabbedMenu
}

// 将 Iceworks 当前支持的标准 routes 配置转成支持 vue-router 的格式
export function vueRoutesAdapter(routeConfig) {
  const routes = [];
  routeConfig.forEach((route) => {
    let currentPath = route.path;
    // vue router 需要 path 第一个为 /
    if (currentPath[0] !== '/') {
      currentPath = `/${currentPath}`;
    }
    const tempRoute = {
      path: currentPath,
      component: route.component,
      children: [],
    };
    if (route.childRoutes && route.childRoutes.length) {
      tempRoute.children = vueRoutesAdapter(route.childRoutes);
    }
    if (route.indexRoute) {
      tempRoute.children.unshift({
        path: '',
        component: route.indexRoute.component,
      });
    }
    routes.push(tempRoute);
  })
  return routes
}

export function getDemoRoutes() {
  let demoRoutes = {
    pages: []
  }
  if (siteOptions['isShowDemoPages']) {
    demoRoutes = require('@/framework/demo/router.json')
  }
  return demoRoutes
}

export function getFavLayout() {
  let favLayout = localStorage.getItem('fav-layout')
  if (siteOptions['globalSiteLayout']) {
    favLayout = siteOptions['globalSiteLayout']
  }
  return favLayout
}
