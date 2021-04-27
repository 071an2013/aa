<template>
  <div class="nav-wrap">
    <div
      class="top-bar level1"
      :class="`${$root.siteRenderer} ${menuLevel2.length == 0 ? 'margin' : ''}`"
      v-cloak
    >
      <Logo :type="$root.siteRenderer" style="padding-left:0" />
      <div v-if="$root.siteRenderer == 'pc'" class="top-bar-menu" ref="menuContainer">
        <el-menu
          mode="horizontal"
          :show-timeout="0"
          :collapse="false"
          :router="false"
          :default-active="getPathActive(menuLevel1)"
          @select="changeMenuLevel1"
          class="top-main-menu"
          ref="menu"
        >
          <McMenuItem v-for="(item, index) in menuLevel1" :meta="item" :key="index" />
          <template v-if="moreMenu.length">
            <el-submenu index="more" class="moreMenu">
              <template slot="title">
                <span>...</span>
              </template>
              <el-menu
                :key="moreMenu.length"
                :show-timeout="0"
                :default-openeds="moreMenuOpenedIDs"
                :default-active="getPathActive(moreMenuLevel1)"
                @select="changeMenuLevel1"
              >
                <McMenuItem v-for="(item, index) in moreMenuLevel1" :meta="item" :key="index" />
              </el-menu>
            </el-submenu>
          </template>
        </el-menu>
      </div>
      <div class="top-bar-right">
        <TopToolbar />
      </div>
    </div>
    <div class="level2" v-if="menuLevel2.length">
      <el-menu
        mode="horizontal"
        :show-timeout="0"
        :collapse="false"
        :router="false"
        :default-active="getPathActive(menuLevel2)"
        @select="changeMenuLevel2"
      >
        <McMenuItem v-for="(item, index) in menuLevel2" :meta="item" :key="index" />
      </el-menu>
    </div>
    <div class="level3" v-if="menuLevel3.length">
      <el-menu
        text-color="#262626"
        active-text-color="#2584ee"
        mode="horizontal"
        :show-timeout="0"
        :collapse="false"
        :router="false"
        :default-active="currentRoutePath"
        @select="onSelectMenuItem"
      >
        <McMenuItem v-for="(item, index) in menuLevel3" :meta="item" :key="index" />
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MenuCommonMixin from "@/framework/layouts/MenuCommonMixin.js";
import { Menu, getRootMenus, getLevelMenus } from "@/framework/utils/layout";
import Logo from "@/framework/components/Logo";
import McMenuItem from "@/framework/components/McMenuItem";
import TabsNav from "@/framework/components/TabsNav";
import TopToolbar from "@/framework/components/TopToolbar";

export default {
  name: "TopBar",
  mixins: [MenuCommonMixin],
  data() {
    return {
      menuLevel2: [],
      menuLevel3: []
    };
  },
  created() {
    this.initMoreMenuContainer();
    this.changeMenuLevel1(this.currentRoutePath);
  },
  computed: {
    moreMenuOpenedIDs() {
      return this.getMenuOpenedIDs(this.moreMenu);
    },
    menuLevel1() {
      const rootMenus = getRootMenus(this.mainMenuConfig);
      return getLevelMenus(rootMenus, 1);
    },
    moreMenuLevel1() {
      const rootMenus = getRootMenus(this.moreMenu);
      return getLevelMenus(rootMenus, 1);
    }
  },
  methods: {
    changeMenuLevel1(path) {
      /**
       * TODO: 跳转外部链接导航高亮到前一级 this.$refs.menu.updateActiveIndex(this.$route.fullPath)
       */
      this.onSelectMenuItem(path);
      if (path.indexOf("http") === 0) return;
      let setRedirectPath = getRootMenus([
        ...this.mainMenuConfig,
        ...this.moreMenu
      ]);
      const getLevel2Menu = getLevelMenus(setRedirectPath, 2, path);
      setRedirectPath = getRootMenus(getLevel2Menu);
      const delChildren = getLevelMenus(setRedirectPath, 1);
      this.menuLevel2 = delChildren;
      this.changeMenuLevel2(path); // 加载3级导航
    },
    changeMenuLevel2(path) {
      this.onSelectMenuItem(path);
      if (path.indexOf("http") === 0) return;
      let setRedirectPath = getRootMenus([
        ...this.mainMenuConfig,
        ...this.moreMenu
      ]);
      const getLevel2Menu = getLevelMenus(setRedirectPath, 2, path);
      setRedirectPath = getRootMenus(getLevel2Menu);
      const getLevel3Menu = getLevelMenus(setRedirectPath, 2, path);
      this.menuLevel3 = getLevel3Menu;
    },
    getPathActive(menus) {
      const nowMenu = menus.filter(item => {
        const regExp = new RegExp(item.path);
        return regExp.test(this.currentRoutePath);
      })[0];
      return nowMenu ? nowMenu.redirectPath : "";
    }
  },
  components: {
    Logo,
    McMenuItem,
    TabsNav,
    TopToolbar
  }
};
</script>

<style lang="scss" scoped>
.nav-wrap {
  background: #f0f2f5;
  overflow: hidden;
  .level1.margin {
    margin-bottom: 20px;
  }
  .level2 {
    height: 52px;
    background: #ffffff;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.08);
    margin-bottom: 20px;
    .el-menu--horizontal > .el-menu-item.is-active {
      border-bottom: 3px solid #409eff;
    }
    .el-menu {
      display: flex;
      justify-content: center;
      border: 0;
      li {
        height: 52px;
        line-height: 52px;
        padding: 0;
        margin: 0 25px;
      }
    }
  }
  .level3 {
    height: 50px;
    background: #ffffff;
    margin: 0 18px;
    .el-menu {
      li {
        height: 49px;
        line-height: 49px;
        padding: 0;
        margin: 0 25px;
      }
    }
  }
}
</style>