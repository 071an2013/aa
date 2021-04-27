import Vue from 'vue'
import App from '@/App'

import router from '@/router'
import store from '@/store'

// 引入框架代码
import { initApp } from '@/framework/index'
const baseApp = initApp({
  router,
  store
})

store.dispatch('getUserInfo').finally(
  () =>
    new Vue({
      mixins: [baseApp],
      created_feat_slot_demo() {
        // 清空默认
        //this.clearSlotComponents('header-right')
        // 删除指定的
        this.deleteSlotComponent('header-right', 'HelpIcon')
        this.deleteSlotComponent('header-right', 'TopbarSearchBox')
        // 添加自己的
        this.fillInSlot('header-right', {
          name: 'MyComponents',
          render(createElement, children) {
            return createElement(
              'div',
              {
                style: { color: '#F00', display: 'none' }
              },
              ['my-component demo']
            )
          }
        })
        // 获取坑位所有的组件
        // 比如可能获取到：
        //
        let headerRightCompoents = this.getSlotComponentNames('header-right')
        console.log(headerRightCompoents)
        // 排序, 有时需要调整次序。
        this.sortSlotComponents('header-right', [
          'MyComponents',
          'UserProfile',
          'ChannelSwitcher',
          'MessageIcon'
        ])
      },
      // framework 中默认将 vue 实例渲染到 ID 为 #app 的 dom 节点上，
      // 通过此处的 el，可以更改 vue 实例的渲染位置。
      // el: '#app',
      render: h => h(App)
    })
)
