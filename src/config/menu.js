/**
 * 主菜单配置（参考下面的配置示例）。
 *
 * 配置示例：
 * {
 *    "name": "表单示例",
 *    "icon": "el-icon-edit-outline",
 *    "path": "/demo/pages/form",
 *    "perm": "/perm/code/1",
 *    "children": [{
 *      "name": "简单表单",
 *      "path": "/basic-form",
 *      "icon": "el-icon-menu"
 *    }, {
 *      "name": "分步表单",
 *      "path": "/step-form",
 *      "icon": "el-icon-menu"
 *    }]
 * }
 *
 *
 * 菜单项参数：
 * @param {String} name : 菜单项文本
 * @param {String} icon : 可选的，菜单项图标
 * @param {String} path : 菜单对应的路由。请注意上面示例中子菜单的路由配置。
 * @param {String} perm :
 * 可选项，菜单项关联的权限码。
 * 若未设置 perm，则菜单项是完全公开的；
 * 若设置了 perm，则只有拥有该权限码的用户才能看到此菜单。
 * 权限码的来源，参考 ./plugins/perm.js
 *
 *
 * 规范：
 * 建议菜单不超过3级，最好只有两级。
 * 菜单的 json 格式必须是合法的格式。
 */
let mainMenuConfig = [{
  "name": "控制台",
  "icon": "el-icon-s-home",
  "path": "/home"
}, {
  "name": "服务管理",
  "icon": "el-icon-menu",
  "path": "/service/list"
}, {
  "name": "资源管理",
  "icon": "el-icon-menu",
  "path": "/resource"
}]

export default mainMenuConfig
