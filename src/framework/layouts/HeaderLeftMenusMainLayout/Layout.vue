<template>
  <div v-if="raw==1">
    <router-view />
  </div>
  <el-container v-else class="fill-in header-left-menus-main-layout">
    <el-header>
      <TopBar />
    </el-header>
    <el-container style="overflow: auto;">
      <el-aside
        :class="{collapsed: !!$root.isMenuCollapsed}"
        v-if="sideMenus && sideMenus.length && $root.siteRenderer == 'pc'"
      >
        <SideBar :menus="sideMenus" />
      </el-aside>
      <el-container>
        <el-header>
          <TabsNav />
        </el-header>
        <el-main ref="mainContainer" class="main-container">
          <transition name="fade">
            <template v-if="isTabbedMenu">
              <keep-alive :max="6">
                <router-view />
              </keep-alive>
            </template>
            <router-view v-else />
          </transition>
          <Footer />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import siteOptions from "@/config/index";
import { getIsTabbedMenu } from "@/framework/utils/config";
import { getPageRouterList } from "@/framework/utils/layout.js";
import Footer from "@/framework/components/Footer";
import TabsNav from "@/framework/components/TabsNav";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import LayoutMixin from "@/framework/layouts/LayoutMixin.js";
export default {
  name: "HeaderLeftMenusMainLayout",
  mixins: [LayoutMixin],
  components: {
    TopBar,
    SideBar,
    TabsNav,
    Footer
  },
  data() {
    return {
      isTabbedMenu: getIsTabbedMenu(),
      sideMenus: []
    };
  },
  watch: {
    $route: {
      handler() {
        this.getSideMenu();
      }
    }
  },
  mounted() {
    this.getSideMenu();
  },
  computed: {
    ...mapGetters(["mainMenuConfig"])
  },
  methods: {
    getCurrentRoutePath() {
      let routeMeta = this.$route.meta || {};
      return routeMeta["menu"] || this.$route.fullPath || "/";
    },
    isAbsolutePath(path) {
      return path.indexOf("http://") === 0 || path.indexOf("https://") === 0;
    },
    getSideMenu() {
      let pageRouterList = getPageRouterList(
        this.mainMenuConfig,
        this.getCurrentRoutePath()
      );
      let rootMenu = pageRouterList[0];
      let childMenus = rootMenu
        ? JSON.parse(JSON.stringify(rootMenu["children"] || []))
        : [];
      childMenus.forEach(menu => {
        menu["path"] =
          this.isAbsolutePath(menu["path"]) || siteOptions["isUseMenuLeafPath"]
            ? menu["path"]
            : rootMenu["path"] + menu["path"];
      });
      this.sideMenus = childMenus;
    }
  }
};
</script>
