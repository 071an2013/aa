import { mapActions, mapGetters } from 'vuex'
import Vue from 'vue';

// vue 全局配置。
Vue.config.productionTip = false;
Vue.config.optionMergeStrategies.render = (parentRenderer, childRenderer) => {
  if (parentRenderer && parentRenderer.length == 2) {
    return function render(...args) {
      args.push([childRenderer.apply(this, args)]);
      return parentRenderer.apply(this, args);
    }
  }
  return childRenderer || parentRenderer;
}

import siteOptions from '@/config/index'
import mainMenuConfig from "@/config/menu";

import api from "@/framework/ajax/index";

import Global from '@/framework/components/Global'
import BasicContainer from '@/framework/components/BasicContainer'
import ExceptionMessage from '@/framework/components/ExceptionMessage'

import UserProfile from '@/framework/components/UserProfile'
import ChannelSwitcher from '@/framework/components/ChannelSwitcher'
import HelpIcon from '@/framework/components/HelpIcon'
import MessageIcon from '@/framework/components/MessageIcon'
import TopbarSearchBox from '@/framework/components/TopbarSearchBox'
import MenuSearchBox from '@/framework/components/MenuSearchBox'
import FullScreen from '@/framework/components/FullScreen'

import { getDemoMenus } from '@/framework/utils/config'
import { enableTracker } from '@/framework/utils/ticker.js'
import { getAppRouter } from '@/framework/utils/router.js'
import { initDocumentTitle } from '@/framework/utils/layout'
import { filterMenuByPerm } from "@/framework/utils/perm";
import { renderWatermark } from '@/framework/utils/watermark'

import frameworkModule from '@/framework/store'

// 引入 element-ui.
import ElementUI from 'element-ui';
Vue.use(ElementUI, {
  size: 'medium'  // 组件的全局尺寸.
})

// 注册全局组件。
Vue.component('basic-container', BasicContainer)
Vue.component('exp-msg', ExceptionMessage)

// 引入框架样式
const theme = localStorage.getItem('fav-theme') || siteOptions['theme'] || 'default'
if (process.env.NODE_ENV == 'development') {
  require('@/framework/styles/themes/' + theme + '.scss');
} else {
  require('@/framework/styles/themes/' + __THEME__ + '.scss');
}

/**
 * 初始化框架代码。
 * @param {Object} params 
 */
let initApp = (params) => {
  // 站点标题
  initDocumentTitle()
  // 埋点处理.
  if (siteOptions['isTrackUser']) {
    enableTracker()
  }
  // 加载 ajax 接口.
  api.load();
  // 全局 event bus.
  window._dc = window._event_bus = new Vue()

  const router = getAppRouter(params['router'], frameworkModule.state['mainMenuConfig'])

  const store = params['store']
  store.registerModule('framework', frameworkModule)

  const slotComponents = {
    // 坑位的默认填充。
    'header-right': [
      //TopbarSearchBox,
      MenuSearchBox,
      MessageIcon,
      HelpIcon,
      ChannelSwitcher,
      UserProfile,
      FullScreen
    ]
  }

  return {
    el: '#app',
    router,
    store,
    data() {
      return {
        // 存储菜单气泡内容，如有几个未读消息。
        menuMessage: {}
      }
    },
    computed: {
      ...mapGetters([
        'siteRenderer',
        'isMenuCollapsed'
      ])
    },
    created() {
      // 加载菜单。
      let allMenus = mainMenuConfig.concat(getDemoMenus())
      filterMenuByPerm(allMenus).then(menus => {
        this.appendMenu(menus)
      });
    },
    mounted() {
      renderWatermark((userInfo) => {
        if (userInfo) {
          // 若启用水印时，获取到了当前用户信息，则保存到全局状态中，后续不需要重新获取。
          this.updateCurrentUser(userInfo)
        }
      })
    },
    methods: {
      ...mapActions([
        'setMenuCollapsedState', 'updateCurrentUser', 'appendMenu'
      ]),
      /**
       * 设置菜单气泡内容。
       * 放到 $root 上，方便其它组件调用。
       * @param {String} path 
       * @param {String|Options} badgeOptions 
       */
      setMenuMessage(path, badgeOptions) {
        if (typeof badgeOptions != 'object') {
          badgeOptions = {
            value: badgeOptions
          }
        }
        const message = badgeOptions.value
        if (!message || message == '0') {
          // 若未指定消息文本，或为 0，则认为删除此消息。
          return this.$delete(this.menuMessage, path)
        } else {
          if (/^\d+$/.test(badgeOptions.value)) {
            // 当消息内容为字符串的数字格式时，兼容 max 配置。
            badgeOptions.value = parseInt(badgeOptions.value)
          }
          this.$set(this.menuMessage, path, badgeOptions)
        }
      },
      // 向插槽中添加组件
      fillInSlot(slotName, component) {
        if (!slotComponents[slotName]) {
          slotComponents[slotName] = []
        }
        slotComponents[slotName].push(component)
      },
      // 获取指定插槽中的组件列表。
      getSlotComponents(slotName) {
        return slotComponents[slotName] || []
      },
      // 获取指定插槽中的组件名称。
      getSlotComponentNames(slotName) {
        return (slotComponents[slotName] || []).map(cmp => cmp.name)
      },
      // 排序
      sortSlotComponents(slotName, orderedNames) {
        let components = slotComponents[slotName] || []
        components.sort((a, b) => {
          if (orderedNames.indexOf(a.name) > orderedNames.indexOf(b.name)) {
            return 1
          } else {
            return -1
          }
        })
      },
      // 清空坑位的所有组件。
      clearSlotComponents(slotName) {
        let oldComponents = slotComponents[slotName]
        slotComponents[slotName] = []
        return oldComponents
      },
      // 删除指定组件
      deleteSlotComponent(slotName, componentName) {
        let components = slotComponents[slotName] || []
        for (let i = 0; i < components.length; i++) {
          if (components[i]['name'] == componentName) {
            slotComponents[slotName].splice(i, 1)
            break;
          }
        }
      },

    },
    /**
     * 渲染组件。
     * @param {Function} createElement 
     * @param {Array} children 
     */
    render(createElement, children) {
      return createElement(
        "div",
        {
          class: 'fill-in app-wrapper ' + this.siteRenderer
        },
        [createElement(Global), ...children]
      )
    }
  }
}

export {
  initApp
}
