<template>
  <div class="top-bar" :class="$root.siteRenderer" style="padding-left:0">
    <div class="top-bar-left" style="margin-right:0">
      <Logo :type="$root.siteRenderer" :isAlwaysShowSiteName="true" class="left-pane-width" />
    </div>
    <div v-if="$root.siteRenderer == 'pc'" class="top-bar-menu" ref="menuContainer">
      <el-menu
        ref="menu"
        mode="horizontal"
        :show-timeout="200"
        :collapse="false"
        :router="false"
        :default-active="currentRoutePath"
        @select="onSelectMenuItem"
        class="top-menu"
      >
        <McMenuItem v-for="(item, index) in menus" :meta="item" :key="index" onlyShowRoot />
        <template v-if="moreMenu.length">
          <el-submenu index="/moreMenu" key="/moreMenu" class="moreMenu">
            <template slot="title">
              <span>...</span>
            </template>
            <McMenuItem v-for="(item, index) in moreMenu" :meta="item" :key="index" onlyShowRoot />
          </el-submenu>
        </template>
      </el-menu>
    </div>
    <div class="top-bar-right">
      <TopToolbar />
    </div>
  </div>
</template>

<script>
import MenuCommonMixin from "@/framework/layouts/MenuCommonMixin.js";
import { mapActions, mapGetters } from "vuex";
import {
  getRootMenus,
  getRootMenuIndexByRouterPath,
  Menu
} from "@/framework/utils/layout";
import Logo from "@/framework/components/Logo";
import McMenuItem from "@/framework/components/McMenuItem";
import TopToolbar from "@/framework/components/TopToolbar";
export default {
  name: "TopBar",
  mixins: [MenuCommonMixin],
  data() {
    return {
      moreMenu: [],
      menus: []
    };
  },
  computed: {
    fullPath() {
      let routeMeta = this.$route.meta || {};
      // routeMeta["menu"] 的处理，参照路由配置中的 meta.
      let path = routeMeta["menu"] || this.$route.fullPath || "/";
      return window.decodeURIComponent(path) || "/";
    }
  },
  created() {
    this.menus = getRootMenus(this.mainMenuConfig);
    this.initMoreMenuContainer();
  },
  methods: {
    getCurrentRouterPath() {
      let rootMenuIndex = getRootMenuIndexByRouterPath(
        this.mainMenuConfig,
        this.fullPath
      );
      if (rootMenuIndex != -1) {
        if (this.menus[rootMenuIndex]) {
          const menuItemMeta = this.menus[rootMenuIndex];
          this.currentRoutePath =
            menuItemMeta["redirectPath"] || menuItemMeta["path"];
        } else {
          this.currentRoutePath = "/moreMenu";
        }
      } else {
        this.currentRoutePath = "/";
      }
    }
  },
  components: {
    Logo,
    McMenuItem,
    TopToolbar
  }
};
</script>
