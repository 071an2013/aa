<template>
  <div>
    <div
      class="unselected tabs-list"
      :class="{hide: !isShowTabs}"
      ref="tabs_wrapper"
      style="display:flex;"
    >
      <div style="flex:1;overflow:auto;">
        <el-tabs
          ref="tabs"
          v-model="currentMenuTab"
          type="card"
          :closable="allTabs.length > 1"
          @tab-remove="removeTab"
          @tab-click="clickTab"
        >
          <el-tab-pane
            v-for="(item) in allTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          ></el-tab-pane>
        </el-tabs>
        <!--页签工具菜单-->
        <div v-if="this.allTabs.length > 1" class="tabs-contextmenu" :style="contextMenuStyle">
          <div
            v-if="contextMenu.index > 0"
            class="tabs-contextmenu-item"
            @click="removeLeftTabs(contextMenu.index)"
          >
            <el-link :underline="false" icon="el-icon-arrow-left">关闭左侧</el-link>
          </div>
          <div
            v-if="contextMenu.index < allTabs.length - 1"
            class="tabs-contextmenu-item"
            @click="removeRightTabs(contextMenu.index)"
          >
            <el-link :underline="false" icon="el-icon-arrow-right">关闭右侧</el-link>
          </div>
          <div class="tabs-contextmenu-item" @click="removeOtherTabs(contextMenu.index)">
            <el-link :underline="false" icon="el-icon-close">关闭其它</el-link>
          </div>
        </div>
      </div>
      <div v-if="mode ==1">
        <Breadcrumb :is-show-title="false" style="padding-left:35px;" />
      </div>
    </div>
    <Breadcrumb v-if="mode==2 || !isShowTabs" />
  </div>
</template>


<script>
import siteOptions from "@/config/index";
import { getIsTabbedMenu } from "../utils/config";
import Breadcrumb from "./Breadcrumb";
import {
  getMenuTabs,
  removeMenuTab,
  removeLeftTabs,
  removeRightTabs,
  removeOtherTabs
} from "@/framework/utils/layout";

export default {
  components: { Breadcrumb },
  data() {
    return {
      mode: siteOptions["breadcrumbMode"],
      isTabbedMenu: getIsTabbedMenu(),
      allTabs: [],
      currentMenuTab: null,
      contextMenu: {
        left: 0,
        top: 0,
        width: 106,
        visible: false,
        index: 0
      }
    };
  },
  computed: {
    isShowTabs() {
      return this.isTabbedMenu && this.$root.siteRenderer == "pc";
    },
    contextMenuStyle() {
      let contextMenuOptions = this.contextMenu;
      return {
        left: contextMenuOptions.left + "px",
        top: contextMenuOptions.top + "px",
        width: contextMenuOptions.width + "px",
        display:
          contextMenuOptions.visible && this.allTabs.length > 1
            ? "block"
            : "none"
      };
    }
  },
  created() {
    if (this.isTabbedMenu) {
      window._dc.$on("menu-tabs-changed", (tabs, currentMenuTab) => {
        this.allTabs = tabs;
        this.currentMenuTab = currentMenuTab ? currentMenuTab["name"] : null;
      });
      window._dc.$on("menu-tabs-removed", (tabs, currentMenuTab) => {
        this.allTabs = tabs;
        this.currentMenuTab = currentMenuTab ? currentMenuTab["name"] : null;
        if (this.currentMenuTab) {
          this.$router.push({
            path: this.currentMenuTab
          });
        }
      });
    }
  },
  mounted() {
    // 标识初始的当前 tab 状态.
    this.allTabs = getMenuTabs();
    if (this.allTabs.length) {
      this.currentMenuTab = this.allTabs[0]["name"];
    }

    let $tabs_wrapper = this.$refs.tabs_wrapper;
    if ($tabs_wrapper) {
      $tabs_wrapper.addEventListener("contextmenu", e => {
        e.preventDefault();
        e.stopPropagation();
        if (e.target.classList.contains("el-tabs__item")) {
          this.contextMenu.visible = true;
          this.contextMenu.index = [].indexOf.call(
            e.target.parentNode.querySelectorAll(".el-tabs__item"),
            e.target
          );
          if (e.target.getBoundingClientRect) {
            let meta = e.target.getBoundingClientRect();
            if (this.contextMenu.index) {
              this.contextMenu.left = meta.left;
              this.contextMenu.top = meta.top + meta.height;
              this.contextMenu.width = meta.width + 1;
            } else {
              this.contextMenu.left = meta.left - 1;
              this.contextMenu.top = meta.top + meta.height;
              this.contextMenu.width = meta.width + 2;
            }
          } else {
            this.contextMenu.left = e.pageX;
            this.contextMenu.top = e.pageY;
            this.contextMenu.width = 106;
          }
        }
      });
    }
    document.body.addEventListener("click", () => {
      this.contextMenu.visible = false;
    });
  },
  methods: {
    removeLeftTabs,
    removeRightTabs,
    removeOtherTabs,
    removeTab(path) {
      removeMenuTab(path, this.currentMenuTab);
    },
    clickTab(tab) {
      this.$router.push({
        path: tab["name"]
      });
    }
  }
};
</script>
