<template>
  <el-menu-item v-if="isLeafMenuItem" :index="fullPath" :key="menuKey">
    <!--叶子菜单-->
    <i v-if="meta.icon" :class="meta.icon" class="menu-icon"></i>
    <span>{{meta.name}}</span>
    <el-badge v-if="badgeOptions" v-bind="badgeOptions" />
  </el-menu-item>
  <el-submenu v-else :index="fullPath" :key="menuKey">
    <!--父级菜单-->
    <template slot="title">
      <i v-if="meta.icon" :class="meta.icon" class="menu-icon"></i>
      <span>{{meta.name}}</span>
      <el-badge v-if="badgeOptions" v-bind="badgeOptions" />
    </template>
    <McMenuItem
      v-for="(subMenuMeta, index) in meta.children"
      :meta="subMenuMeta"
      :parentPath="fullPath"
      :key="fullPath + subMenuMeta.path + index"
    />
  </el-submenu>
</template>


<script>
import siteOptions from "@/config/index";
export default {
  name: "McMenuItem",
  props: {
    /**
     * 菜单的初始配置。
     */
    meta: {
      type: Object
    },
    /**
     * 父级菜单路径。
     */
    parentPath: {
      type: String,
      default: ""
    },
    /**
     * 是否忽略子菜单，将当前菜单渲染成叶子菜单。
     */
    onlyShowRoot: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
     * 当前菜单的相对路径。
     */
    currentPath() {
      return this.meta.redirectPath || this.meta.path;
    },
    /**
     * 当前菜单的绝对路径。
     * 若菜单地址是绝对地址，或内嵌的 iframe 地址，则不使用父级地址。
     */
    fullPath() {
      return this.isAbsolutePath(this.currentPath) ||
        siteOptions["isUseMenuLeafPath"]
        ? this.currentPath
        : this.parentPath + this.currentPath;
    },
    menuKey() {
      return this.fullPath + JSON.stringify(this.meta["querys"] || "");
    },
    /**
     * 当前菜单是否应该做为叶子节点渲染。
     */
    isLeafMenuItem() {
      const meta = this.meta;
      return (
        !meta.children ||
        meta.children.length == 0 ||
        this.onlyShowRoot ||
        this.isAbsolutePath(this.currentPath)
      );
    },
    /**
     * 获取当前菜单项的 badge 配置。
     */
    badgeOptions() {
      if (
        !this.isLeafMenuItem ||
        (this.meta.children && this.meta.children.length)
      ) {
        // 若存在子级节点，且子级节点中存在消息，则仅渲染成小红点。
        if (this.hasMessageInChildren()) {
          return this.getDotMessageOptions();
        }
      } else {
        // 叶子节点处理。
        let options = this.$root.menuMessage[this.fullPath];
        if (!options) return;
        return Object.assign(
          {
            class: "menu-badge"
          },
          siteOptions["defaultBadge"],
          options
        );
      }
    }
  },
  methods: {
    isAbsolutePath(path) {
      return path.indexOf("http://") === 0 || path.indexOf("https://") === 0;
    },
    /**
     * 判断当前菜单的子菜单中是否存在 badge 消息。
     */
    hasMessageInChildren() {
      let hasMessage = false;
      const currentMenuPath = this.parentPath + this.meta.path;
      this.meta.children.map(menuItem => {
        const path = currentMenuPath + menuItem["path"];
        if (this.$root.menuMessage[path]) {
          hasMessage = true;
        }
      });
      return hasMessage;
    },
    /**
     * 获取 badge 仅是一个小红点时的配置。
     */
    getDotMessageOptions() {
      return Object.assign(
        {
          class: "menu-badge"
        },
        siteOptions["defaultBadge"],
        {
          "is-dot": true
        }
      );
    }
  }
};
</script>
