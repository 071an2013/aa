import { mapActions, mapGetters } from "vuex";
import siteOptions from "@/config/index";
import {
  filterMenusByKeyword,
  getMenusLeafCount,
  getMenusOpenedIndexes
} from "@/framework/utils/layout";
import { Menu } from "@/framework/utils/layout";

export default {
  destroyed() {
    if (this.moreMenuObj) {
      this.moreMenuObj.teardown();
    }
  },
  data() {
    return {
      moreMenuObj: null,
      filterMenuKeyword: "",
      // 用于标识当前菜单的选中状态（default-active）。
      currentRoutePath: this.getCurrentRoutePath(),
      moreMenu: []
    }
  },
  watch: {
    $route: {
      handler() {
        // 修复：使用回退按钮，或编程的方式跳转路由时，会导致菜单选中状态的 bug
        this.currentRoutePath = this.getCurrentRoutePath();
      }
    }
  },
  computed: {
    ...mapGetters(["mainMenuConfig"]),
    filteredMenu() {
      return filterMenusByKeyword(this.menus || this.mainMenuConfig, this.filterMenuKeyword);
    },
    isShowMenuSearchBox() {
      return (
        siteOptions["isShowMenuSearchBox"] &&
        !this.$root.isMenuCollapsed &&
        (this.menusCount > siteOptions["whenShowMenuSearchBox"] ||
          this.filterMenuKeyword)
      );
    },
    menusCount() {
      return getMenusLeafCount(this.filteredMenu);
    },
    openedMenus() {
      if (this.filterMenuKeyword) {
        return getMenusOpenedIndexes(this.filteredMenu);
      } else {
        return [];
      }
    }
  },
  methods: {
    getCurrentRoutePath() {
      let routeMeta = this.$route.meta || {};
      return decodeURIComponent(routeMeta["menu"] || this.$route.fullPath || "/");
    },
    onSelectMenuItem(path) {
      if (path && path.indexOf("http") === 0) {
        this.$refs.menu.updateActiveIndex(this.$route.fullPath);
        window.open(path);
      } else {
        this.$router.push({
          path: path,
          query: {}
        });
        this.currentRoutePath = path;
      }
    },
    initMoreMenuContainer() {
      this.$nextTick(() => {
        const parent = this.$refs.menuContainer;
        const child = parent.children[0];
        this.moreMenuObj = new Menu(
          parent,
          child,
          this.menus || this.mainMenuConfig,
          this.moreMenu,
          ".moreMenu",
          this
        );
      });
    },
    // 获取菜单的所有的路径（用于展开菜单）。
    getMenuOpenedIDs(menuItems) {
      let openedIDs = [];
      let collectParentMenuIDs = (menus, parentPath) => {
        menus.forEach(item => {
          if (item["children"] && item["children"].length) {
            openedIDs.push(parentPath + item["path"]);
            collectParentMenuIDs(item["children"], item["path"]);
          }
        });
      };
      collectParentMenuIDs(menuItems || [], "");
      return openedIDs;
    }
  },
}