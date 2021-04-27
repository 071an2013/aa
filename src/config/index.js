import ajaxOptions from './plugins/ajax'
import badgeOptions from './plugins/badge'
import permOptions from './plugins/perm'
import trackerOptions from './plugins/tracker'
import watermarkOptions from './plugins/watermark'

// 自定义皮肤。
// import MyTheme from '@/theme/Layout'

let siteOptions = {
    /**
     * 站点首页。
     */
    indexPath: '/home',
    /**
     * 站点皮肤。
     * 目前提供 4 种:
     * default （深色默认）
     * green （绿色）
     * tint （浅色）
     * senior (成都定制 该皮肤必须配合HeaderLeftSeniorLayout布局使用)
     */
    theme: 'default',
    /**
     * 自定义皮肤
     */
    // customTheme: MyTheme,
    /**
     * 是否使用 menu 配置中叶子节点的 path。
     * 默认情况下使用的是: 叶子节点的 path 加上其父节点的 path。
     * 默认仅有 /iframe 与 http 开头的叶子节点路径，才不会追加其父节点的 path。
     */
    isUseMenuLeafPath: false,
    /**
     * 是否显示示例页面
     */
    isShowDemoPages: false,
    /**
     * 是否以页签的形式显示菜单。
     */
    isTabbedMenu: true,
    /**
     * 面包屑模式
     * 1, 面包屑与 tabnav 合并到一栏
     * 2，面包屑与 tagnav 分开
     */
    breadcrumbMode: 1,
    /**
     * 是否显示右下角的开发者按钮。
     */
    isShowDevTool: false,
    /**
     * 是否使用 rad-cli 启动的图形化界面配置项目。
     */
    isUseRadCli: false,
    /**
     * 是否显示菜单搜索框
     */
    isShowMenuSearchBox: true,
    /**
     * 超过多少个菜单时，才显示菜单搜索框.
     * 此处默认值为2，是为了测试。实际项目中一般设置为 > 10
     */
    whenShowMenuSearchBox: 10,
    /**
     * 设置菜单布局方式。
     * 未设置此项时，每一个页面可以单独设置布局（在 router.js 中）。
     * 若设置了此项，则强制站点全部页面使用此布局（router.js 中的布局设置将失效）。
     *
     * 可选的布局配置有 4 种：
     * HeaderLeftMainLayout (左侧菜单)
     * HeaderMainLayout (顶部菜单)
     * HeaderLeftMenusMainLayout (顶部+左侧菜单)
     * HeaderLeftSeniorLayout (成都定制 该布局必须配合senior皮肤使用)
     * HeaderTiledMainLayout (顶部平铺)
     */
    globalSiteLayout: '',
    /**
     * 当布局选择 HeaderLeftMenusMainLayout 时，左侧菜单是否允许折叠。
     */
    isLeftPaneCollapsable: true,
    /**
     * 是否默认打开第一个子菜单页面，默认为 true (仅对于菜单同时存在于顶部与左侧时生效)。
     *
     * 若配置成 false，则需要注册父级菜单的路由。
     * 如下所示的菜单配置：
     * {
     *	 "name": "表单示例",
     *	 "icon": "el-icon-edit-outline",
     *	 "path": "/demo/pages/form",
     *	 "children": [{
     *		 "name": "简单表单",
     *		 "path": "/basic-form",
     *		 "icon": "el-icon-menu"
     *	 }]
     * }
     * 不仅需要注册子菜单路由：/demo/pages/form/basic-form
     * 也需要注册父菜单路由：/demo/pages/form
     */
    isOpenFirstChildMenu: true,
    companyName: '美菜网',
    siteName: '网关中台',
    copyrightText: 'Copyright © 2018 美菜网版权所有',
    departmentText: '成研-餐饮研发二部',
    /**
     * 用户点击’退出‘菜单时执行的回调函数。
     * @param {Object} currentUserInfo : 当前用户信息，包含用户名与用户ID。
     */
    onLogout: function (currentUserInfo) {
        const location = window.location || document.location
        if (location.href.indexOf('site/afterLogin') !== -1) {
          return
        }
        const { hostname } = location
        if (hostname.indexOf('dev') > -1 || hostname.indexOf('local') > -1) {
            location.href =
                'https://sso.test.yunshanmeicai.com/user/logout?system_key=gateway-center';
        } else if (hostname.indexOf('test2') > -1) {
            location.href =
                'https://sso-test2.qc.yunshanmeicai.com/user/logout?system_key=gateway-center';
        } else if (hostname.indexOf('stage') > -1 || hostname.indexOf('stable') > -1) {
            location.href =
                'https://sso.stage.yunshanmeicai.com/user/logout?system_key=gateway-center';
        } else if (hostname.indexOf('test') > -1) {
            location.href =
                'https://sso.test.yunshanmeicai.com/user/logout?system_key=gateway-center';
        } else {
            location.href =
                'https://sso.yunshanmeicai.com/user/logout?system_key=';
        }
    },
    ...ajaxOptions,
    ...badgeOptions,
    ...permOptions,
    ...trackerOptions,
    ...watermarkOptions
}

export default siteOptions
