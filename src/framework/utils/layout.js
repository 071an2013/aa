import siteOptions from '@/config/index'

export function getPageRouterList(mainMenuConfig, routerPath) {
  let pageRouterList = []
  let hasGetRouterList = false
  let walkMenus = (menus, index) => {
    for (let i = 0; i < menus.length; i++) {
      let menu = menus[i]
      pageRouterList[index] = menu
      let currentRouterList = pageRouterList.slice(0, index + 1)
      let path = currentRouterList.map(router => router.path).join('')
      if (path == routerPath || path == window.decodeURIComponent(routerPath)) {
        pageRouterList = currentRouterList
        hasGetRouterList = true
        return true;
      }
      if (walkMenus(menu['children'] || [], index + 1)) {
        return true
      }
    }
  }
  walkMenus(mainMenuConfig, 0)

  // 暂时兼容一下，再找一次.
  if (!hasGetRouterList) {
    routerPath = routerPath.split('?')[0]
    pageRouterList = []
    walkMenus(mainMenuConfig, 0)
  }

  return hasGetRouterList ? pageRouterList : [];
}

/**
 * 获取顶级菜单。
 * 对于菜单在顶部与左侧同时存在的情况，对顶级菜单进行预处理。
 * @param {Object} mainMenuConfig 
 */
export function getRootMenus(mainMenuConfig) {
  return mainMenuConfig.map((topMenuItem, index) => {
    let newTopMenuItem = {
      path: topMenuItem['path'],
      name: topMenuItem['name'],
      icon: topMenuItem['icon'] || 'el-icon-menu',
      children: topMenuItem['children']
    }
    let getFirstChildPath = items => {
      let firstPath = ''
      for (let i = 0; i < items.length; i++) {
        let item = items[i]
        if (item['path']) {
          firstPath = item['path']
        }
        if (item['children']) {
          firstPath += getFirstChildPath(item['children'])
        }
        if (firstPath) {
          break
        }
      }
      return firstPath
    }
    if (siteOptions['isOpenFirstChildMenu']) {
      newTopMenuItem['redirectPath'] = (newTopMenuItem['path'] || '') +
        getFirstChildPath(topMenuItem['children'] || [])
    } else {
      if (!newTopMenuItem['path']) {
        throw new Error('配置 isOpenFirstChildMenu 的值为 false 时，父级菜单也需要指定路由！')
      }
    }
    return newTopMenuItem
  })
}

export function getRootMenuIndexByRouterPath(mainMenuConfig, routerPath) {
  let findMenuTopIndex = (items) => {
    let rootMenuIndex = -1
    for (let i = 0; i < items.length; i++) {
      let item = items[i]
      if (item['path'] == routerPath ||
        (item['path'] && routerPath.indexOf(item['path'] + '/') === 0)
      ) {
        rootMenuIndex = i
        break
      } else {
        if (!item['path'] && item['children']) {
          rootMenuIndex = findMenuTopIndex(item['children'] || [])
          if (rootMenuIndex != -1) {
            rootMenuIndex = i
            break;
          }
        }
      }
    }
    return rootMenuIndex
  }
  let rootMenuIndex = findMenuTopIndex(mainMenuConfig)
  //if(rootMenuIndex == -1){
  // 	rootMenuIndex = 0
  // }
  return rootMenuIndex
}

// 检查菜单是否超出，否者添加更多图标 的类
export class Menu {
	/**
	 * @param {[DOM]} parent       		父容器
	 * @param {[DOM]} child        		子容器
	 * @param {[Array]} menu         	全部菜单
	 * @param {[Array]} moreMenu     	更多菜单
	 * @param {[String]} moreSelector 更多菜单选择器
	 * @param {[Vue]} vm           		当前组件实例
	 */
  constructor(parent, child, menu, moreMenu, moreSelector, vm) {
    this.parent = parent
    this.child = child
    this.menu = menu
    this.moreMenu = moreMenu
    this.moreSelector = moreSelector
    this.vm = vm
    this.timer = null
    this.isInitMenu = false
    this.resizeHander = this.resize.bind(this)
    this.initialize()
  }
  initialize() {
    this.checkExceed()
    window.addEventListener('resize', this.resizeHander, false)
  }
  getComputedStyle(dom, prop) {
    let val = window.getComputedStyle(dom, false)[prop]
    return Number.parseFloat(val)
  }
  initMenu() {
    this.menu.forEach((item, index) => {
      item._width = this.getComputedStyle(this.child.children[index], 'width')
    })
  }
  checkExceed() {
    let parentWidth = this.getComputedStyle(this.parent, 'width')
    let parentHeight = this.getComputedStyle(this.parent, 'height')
    let childWidth = this.getComputedStyle(this.child, 'width')
    let childHeight = this.getComputedStyle(this.child, 'height')
    let more = this.child.querySelector(this.moreSelector)
    let moreWidth = more && this.getComputedStyle(more, 'width') || 0
    if (!this.isInitMenu) {
      this.isInitMenu = true
      this.initMenu()
    }
    if (
      this.menu.length &&
      (childHeight > (parentHeight + 10) || (childWidth + moreWidth) > parentWidth)
    ) {
      this.moreMenu.unshift(this.menu.pop())
      this.vm.$nextTick(() => {
        this.checkExceed()
      })
    }
    else if (
      this.moreMenu.length &&
      (childWidth + this.moreMenu[0]._width + moreWidth) <= parentWidth
    ) {
      this.menu.push(this.moreMenu.shift())
      this.vm.$nextTick(() => {
        this.checkExceed()
      })
    }
  }
  resize() {
    this.timer && clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.checkExceed()
    }, 100)
  }
  teardown() {
    window.removeEventListener('resize', this.resizeHander, false)
  }
}


let menuTabs = []
let currentMenuTab = null

// 添加页签.
export function addMenuTab(menuItem) {
  let oldMenuItem = menuTabs.find((item) => {
    return item['name'] == menuItem['name']
  })
  if (!oldMenuItem) {
    if (menuItem['group']) {
      let sameTabGroupMenuItemIndex = menuTabs.findIndex((item) => {
        return item['group'] == menuItem['group']
      })
      if (sameTabGroupMenuItemIndex > -1) {
        menuTabs.splice(sameTabGroupMenuItemIndex, 1, menuItem)
      } else {
        menuTabs.push(menuItem)
      }
    } else {
      menuTabs.push(menuItem)
    }
  }
  currentMenuTab = menuItem
  window._dc.$emit('menu-tabs-changed', menuTabs, currentMenuTab)
}

export function removeMenuTab(path, currentPath) {
  for (var i = 0; i < menuTabs.length; i++) {
    if (menuTabs[i]['name'] == path) {
      menuTabs.splice(i, 1)
      if (path == currentPath) {
        if (!menuTabs.length) {
          currentMenuTab = null
        } else {
          if (i == 0) {
            currentMenuTab = menuTabs[0]
          } else {
            currentMenuTab = menuTabs[i - 1]
          }
        }
      }
      break;
    }
  }
  window._dc.$emit('menu-tabs-removed', menuTabs, currentMenuTab)
}

export function removeLeftTabs(index) {
  currentMenuTab = menuTabs[index]
  let count = index
  while (count--) {
    menuTabs.shift()
  }
  window._dc.$emit('menu-tabs-removed', menuTabs, currentMenuTab)
}

export function removeRightTabs(index) {
  currentMenuTab = menuTabs[index]
  let count = menuTabs.length - index - 1
  while (count--) {
    menuTabs.pop()
  }
  window._dc.$emit('menu-tabs-removed', menuTabs, currentMenuTab)
}

export function removeOtherTabs(index) {
  currentMenuTab = menuTabs[index]
  menuTabs = [menuTabs[index]]
  window._dc.$emit('menu-tabs-removed', menuTabs, currentMenuTab)
}

export function getMenuTabs() {
  return menuTabs
}

export function filterMenusByKeyword(menuConfig, keyword) {
  keyword = keyword.replace(/(^\s*)|(\s*$)/g, "").replace(/(^　*)|(　*$)/g, "");
  if (!keyword) {
    return menuConfig
  }
  menuConfig = JSON.parse(JSON.stringify(menuConfig))
  let filterMenus = (menus) => {
    return menus.filter(item => {
      let isVisible = item['name'] &&
        item['name'].toLowerCase().indexOf(keyword.toLowerCase()) > -1

      let isHasChildren = item['children'] && item['children'].length
      if (isHasChildren) {
        item['children'] = filterMenus(item['children'])
        isVisible = !!item['children'].length
      }
      return isVisible
    })
  }
  return filterMenus(menuConfig)
}

export function getMenusLeafCount(menuConfig) {
  let count = 0;
  let countFun = (items) => {
    items.forEach(item => {
      if (item['children'] && item['children'].length) {
        countFun(item['children'])
      } else {
        count++
      }
    })
  }
  countFun(menuConfig)
  return count
}

export function getMenusOpenedIndexes(menuConfig) {
  let openedIDs = [];
  let countFun = (items, parentPath) => {
    items.forEach(item => {
      if (item['children'] && item['children'].length) {
        if (item['path']) {
          openedIDs.push(parentPath + item['path'])
        }
        countFun(item['children'], item['path'])
      }
    })
  }
  countFun(menuConfig, '')
  return openedIDs
}

export function initDocumentTitle() {
  let siteTitle = siteOptions['siteName']
  if (siteOptions['companyName']) {
    siteTitle += ' | ' + siteOptions['companyName']
  }
  document.title = siteTitle
}

/**
 * 获取固定级菜单
 */
export function getLevelMenus(mainConfig, level, path) {
  const cloneMenuConfig = JSON.parse(JSON.stringify(mainConfig))
  if (level == 1) {
    cloneMenuConfig.map(item => {
      delete item.children
    })
    return cloneMenuConfig
  }
  if (level == 2) {
    let level2menu = cloneMenuConfig.filter(item => {
      const regExp = new RegExp(item.path)
      return regExp.test(path)  // TODO: path.indexOf(item.path) === 0
    })[0]
    if (level2menu && level2menu.children) {
      return level2menu.children.map(item => {
        item.path = level2menu.path + item.path
        return item
      })
    }
  }
  if (level == 3) {
    // 暂时用 level1 level2 代替
  }
  return []
}