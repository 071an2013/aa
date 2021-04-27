import siteOptions from '@/config/index'

/**
 * 权限过滤菜单.
 * @returns {Promise}.
 */
export function filterMenuByPerm(menuConfig) {
  return new Promise(function (resolve, reject) {
    siteOptions['permScheme']['getAllMyPerms']().then(permCodes => {
      try {
        resolve(_filterMenuByPerm(menuConfig, permCodes || []));
      } catch (e) {
        console.log(e)
        reject('菜单过滤失败!')
      }
    })
  })
}

function _filterMenuByPerm(menuConfig, permCodes) {
  let filterMenus = (menus) => {
    return menus.filter(item => {
      let isPermed = !item['perm'] ||
        (item['perm'] && permCodes.includes(item['perm']))
      if (isPermed && item['children'] && item['children'].length) {
        item['children'] = filterMenus(item['children'])
        if (!item['children'].length) {
          delete item['children']
        }
      }
      return isPermed
    })
  }
  return filterMenus(menuConfig)
}
